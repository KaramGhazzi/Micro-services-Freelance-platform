import { useCallback } from 'react';
import { useEnvContext } from 'next-runtime-env';
import Talk from 'talkjs';
import { useTranslations } from 'next-intl';
import { getImageUrl } from '../(dashboard)/_utils/getImageUrl';
import { useAuth } from './useAuth';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';

type UseChatProps = {
  assignmentApplication?: GetAssignmentApplicationQuery['assignmentApplication'];
  asGuest?: boolean;
};

type ProfilePhoto = NonNullable<
  GetAssignmentApplicationQuery['assignmentApplication']
>['owner']['profilePhoto'];

type ConversationAttributes = {
  assignmentTitle: string;
  assignmentStatus: string;
  assignmentStatusTranslated: string;
  assignmentCompany: string;
  otherParticipantName: string;
  isAssignmentOwner: string;
  assignmentOwnerLink: string;
  assignmentApplicantLink: string;
  assignmentReference?: string;
  otherParticipantProfilePicture?: string;
};

export const useChat = ({ assignmentApplication, asGuest }: UseChatProps) => {
  const envContext = useEnvContext();
  const { currentUser, currentCompany } = useAuth();
  const t = useTranslations();

  const baseUrl =
    envContext['NEXT_PUBLIC_BASE_URL'] ??
    process?.env?.['NEXT_PUBLIC_BASE_URL'];
  const talkJsAppId =
    envContext['NEXT_PUBLIC_TALKJS_APP_ID'] ??
    process?.env?.['NEXT_PUBLIC_TALKJS_APP_ID'];

  const getTalkUserFromUser = (
    userId?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    profilePhoto?: string | null
  ) => {
    if (!userId) {
      throw new Error('No owner user found');
    }

    return new Talk.User({
      id: userId,
      name: `${firstName} ${lastName}`,
      role: 'default',
      photoUrl: profilePhoto,
    });
  };

  const getOtherParticipantName = (meUser: Talk.User) => {
    if (
      meUser.id === getAssignmentOwnerUser().id ||
      isAssignmentOwnerCompany()
    ) {
      return `${assignmentApplication?.owner.firstName} ${assignmentApplication?.owner.lastName}`;
    } else {
      return `${assignmentApplication?.assignment.owner.firstName} ${assignmentApplication?.assignment.owner.lastName}`;
    }
  };

  const isAssignmentOwnerCompany = () => {
    return assignmentApplication?.assignment?.company.id === currentCompany?.id;
  };

  const getAssignmentOwnerUser = useCallback(() => {
    const { externalId, firstName, lastName, profilePhoto } =
      assignmentApplication?.assignment?.owner || {};
    return getTalkUserFromUser(
      externalId,
      firstName,
      lastName,
      getProfilePhoto(profilePhoto)
    );
  }, [assignmentApplication]);

  const getApplicationOwnerUser = useCallback(() => {
    const { externalId, firstName, lastName, profilePhoto } =
      assignmentApplication?.owner || {};
    return getTalkUserFromUser(
      externalId,
      firstName,
      lastName,
      getProfilePhoto(profilePhoto)
    );
  }, [assignmentApplication]);

  const getProfilePhoto = (profilePhoto?: ProfilePhoto | null) => {
    if (profilePhoto) {
      const { container, blobName } = profilePhoto;
      return getImageUrl(container, blobName);
    }
  };

  const getOtherParticipantProfilePicture = (meUser: Talk.User) => {
    if (meUser.id === getAssignmentOwnerUser().id) {
      return getProfilePhoto(assignmentApplication?.owner.profilePhoto);
    } else {
      if (assignmentApplication?.assignment.owner.profilePhoto) {
        return getProfilePhoto(
          assignmentApplication?.assignment.owner.profilePhoto
        );
      }
    }
  };

  const syncConversation = useCallback(
    (session: Talk.Session) => {
      const conversationId = assignmentApplication?.id;

      if (!conversationId) {
        // this should not happen, because syncConversation is only called after assignmentApplication is loaded
        throw new Error('No application ID found');
      }

      const conversation = session.getOrCreateConversation(
        String(conversationId)
      );

      const assignmentOwnerLink = `${baseUrl}/mijn-opdrachten/${assignmentApplication?.assignment.id}/reactie/${conversationId}`;
      const assignmentApplicantLink = `${baseUrl}/opdracht-vinden/mijn-reacties/${conversationId}`;

      // @TODO resolve any usage
      const customAttributes: ConversationAttributes = {
        assignmentTitle: String(assignmentApplication?.assignment.title),
        assignmentStatus: String(
          assignmentApplication?.assignment.currentStatus.key
        ),
        assignmentStatusTranslated: t(
          `assignment.status.${assignmentApplication?.assignment.currentStatus.key}`
        ),
        assignmentCompany: String(
          assignmentApplication?.assignment.company.name
        ),
        otherParticipantName: getOtherParticipantName(session.me),
        isAssignmentOwner: String(
          session.me.id === getAssignmentOwnerUser().id
        ),
        assignmentOwnerLink: assignmentOwnerLink,
        assignmentApplicantLink: assignmentApplicantLink,
      };

      if (
        assignmentApplication?.assignment.externalCode &&
        assignmentApplication?.assignment.externalCode !== null
      ) {
        customAttributes.assignmentReference = String(
          assignmentApplication?.assignment.externalCode
        );
      }

      if (getOtherParticipantProfilePicture(session.me)) {
        customAttributes.otherParticipantProfilePicture = String(
          getOtherParticipantProfilePicture(session.me)
        );
      }

      conversation.setAttributes({
        custom: customAttributes,
      });

      if (!asGuest) {
        conversation.setParticipant(session.me);
      }

      if (session.me.id === getAssignmentOwnerUser().id) {
        conversation.setParticipant(getApplicationOwnerUser());
      } else {
        conversation.setParticipant(getAssignmentOwnerUser());
      }
      return conversation;
    },
    [assignmentApplication]
  );

  const syncUser = useCallback(() => {
    if (!currentUser?.externalId) {
      throw new Error('No current user found');
    }

    const photoUrl = currentUser.profilePhoto
      ? getImageUrl(
          currentUser.profilePhoto?.container,
          currentUser.profilePhoto?.blobName
        )
      : undefined;

    return new Talk.User({
      id: currentUser.externalId,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      role: 'default',
      photoUrl: photoUrl,
    });
  }, [currentUser]);

  return {
    syncConversation,
    syncUser,
    talkJsAppId,
  };
};
