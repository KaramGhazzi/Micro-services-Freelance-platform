'use client';
import { useTranslations } from 'next-intl';
import React, { useContext, useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import { companyAboutSchema } from '@package/types/dist/yup/pwa/company-about.schema';
import { ProductSlug } from '@package/types/dist/class-validator';
import { notFound, useRouter } from 'next/navigation';
import CompanyProfile from '../../../opdracht-vinden/opdracht/[opdrachtId]/_components/CompanyProfile';
import { getImageUrl } from '../../../_utils/getImageUrl';
import SingleFileUpload from '@/app/_components/SingleFileUpload';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseTextarea from '@/app/_components/BaseTextarea';
import BaseButton from '@/app/_components/BaseButton';
import IconThumbsUp from '@/app/_components/icons/IconThumbsUp';
import BaseUserAvatar from '@/app/_components/BaseUserAvatar';
import {
  CompanyImageType,
  CompanyType,
  Review,
  ReviewInformation,
  ReviewType,
  SortOrder,
} from '@/graphql/types';
import { useReviewsQuery } from '@/graphql/queries/reviews/reviews.generated';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import BaseInput from '@/app/_components/BaseInput';
import useFileUpload from '@/app/_libs/useFileUpload';
import useFileDelete from '@/app/_libs/useFileDelete';
import { useReviewInformationQuery } from '@/graphql/queries/reviews/reviewInformation.generated';
import { useUpdateCompanyImageMutation } from '@/graphql/mutations/companies/updateCompanyImage.generated';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import { useDeleteCompanyImageMutation } from '@/graphql/mutations/companies/deleteCompanyImage.generated';
import { basicMyCompanyToolbarTabs } from '@/app/(dashboard)/_data/companyToolbarTabs';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import WithGuard from '@/app/_components/WithGuard';
import ContractContext from '@/app/(dashboard)/_context/ContractContext';
import CompanyReferencesList from '@/app/_components/company-references/ReferencesList';
import { useUpdateCompanyMutation } from '@/graphql/mutations/companies/updateCompany.generated';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  about?: string;
  youtubeUrl?: string;
  showCurrentAssignments: boolean;
  showEmployees: boolean;
}

type PreviewFiles = {
  coverImageUrl?: {
    file?: globalThis.File;
    temporaryUrl?: string;
  };
  logoImageUrl?: {
    file?: globalThis.File;
    temporaryUrl?: string;
  };
};

export default function Page() {
  const t = useTranslations();
  const global = useTranslations('global');
  const { hasActiveContractSlugs } = useContext(ContractContext);
  const { currentCompany, refetchMe } = useAuth();
  const router = useRouter();

  const validationSchema = companyAboutSchema();
  const [formData, setFormData] = useState<FormData>({
    about: '',
    youtubeUrl: '',
    showCurrentAssignments: false,
    showEmployees: false,
  });
  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  const [reviews, setReviews] = useState<Map<string, Review>>(new Map());
  const [reviewInformation, setReviewInformation] =
    useState<ReviewInformation>();
  const maxReviews = 5;

  const { loading, refetch: loadReviews } = useReviewsQuery({ skip: true });
  const { refetch: loadReviewInformation } = useReviewInformationQuery({
    skip: true,
  });

  const [skip, setSkip] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [coverImageFileUrl, setCoverImageFileUrl] = useState<
    string | undefined
  >();
  const [logoImageFileUrl, setLogoImageFileUrl] = useState<
    string | undefined
  >();

  const [previewImages, setPreviewFiles] = useState<PreviewFiles>();
  const [deleteImages, setDeleteImages] = useState<{
    coverImageDelete: boolean;
    logoImageDelete: boolean;
  }>({ coverImageDelete: false, logoImageDelete: false });
  const { uploadFile } = useFileUpload();
  const { deleteFile } = useFileDelete();
  const [updateCompanyMutation] = useUpdateCompanyMutation();
  const [updateCompanyImage] = useUpdateCompanyImageMutation();
  const [deleteCompanyImage] = useDeleteCompanyImageMutation();

  useEffect(() => {
    if (!currentCompany) {
      return;
    }

    setFormData({
      about: currentCompany.about ?? '',
      youtubeUrl: currentCompany.youtubeUrl ?? '',
      showCurrentAssignments: currentCompany.showCurrentAssignments,
      showEmployees: currentCompany.showEmployees,
    });

    const retrieveReviews = async () => {
      try {
        const data = await loadReviews({
          where: {
            type: { equals: ReviewType.Top },
            companyId: { equals: Number(currentCompany?.id) },
          },
          orderBy: [{ createdAt: SortOrder.Desc }],
          take: maxReviews,
          skip,
        });
        setReviewCount(data?.data?.count);
        const newReviews = new Map<string, Review>(reviews);

        data?.data?.reviews.forEach((review) => {
          newReviews.set(review.id, review as Review);
        });

        setReviews(newReviews);
      } catch (error) {
        console.error('Error while retrieving reviews:', error);
      }
    };
    retrieveReviews();
  }, [currentCompany, skip]);

  useEffect(() => {
    if (!currentCompany) {
      return;
    }

    const retrieveData = async () => {
      try {
        if (currentCompany.coverImageFile) {
          const coverImageFile = getImageUrl(
            currentCompany.coverImageFile?.container,
            currentCompany.coverImageFile?.blobName
          );
          if (coverImageFile) {
            setCoverImageFileUrl(coverImageFile);
          }
        }

        if (currentCompany.logoImageFile) {
          const logoImageFile = getImageUrl(
            currentCompany.logoImageFile?.container,
            currentCompany.logoImageFile?.blobName
          );
          if (logoImageFile) {
            setLogoImageFileUrl(logoImageFile);
          }
        }
      } catch (error) {
        console.error('Error while retrieving data:', error);
      }
    };

    loadReviewInformation({ companyId: Number(currentCompany?.id) }).then(
      (data) => {
        setReviewInformation(data?.data?.reviewInformation);
      }
    );

    retrieveData();
  }, [currentCompany]);

  useEffect(() => {
    refetchMe();
  }, [currentCompany]);

  const loadMoreReviews = () => {
    setSkip(skip + 5);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name, e.target.checked);
  };

  const updateFormData = (key: string, value: unknown) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setSuccess(false);
    updateFormData(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    setFormErrors({});
    try {
      const validatedData = await validationSchema.validate(formData, {
        abortEarly: false,
      });

      await updateCompanyMutation({
        variables: {
          where: {
            id: Number.parseInt(currentCompany?.id ?? '-1'),
          },
          data: validatedData,
        },
        onCompleted: () => {
          setSuccess(true);
        },
      });

      await updateCoverImage(previewImages?.coverImageUrl?.file);
      await updateLogoImage(previewImages?.logoImageUrl?.file);
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        e.inner.forEach((error) => {
          if (error.path && Object.keys(formData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setFormErrors({ about: global('errors.unknownError') });
      }
    }
  };

  const saveImage = async (
    file: globalThis.File,
    imageType: CompanyImageType
  ) => {
    const fileData = await uploadFile('uploads', file);

    try {
      await updateCompanyImage({
        variables: {
          data: {
            name: file.name,
            blobName: fileData.blobName,
            size: file.size,
          },
          imageType: imageType,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const imageUrl = getImageUrl(fileData.containerName, fileData.blobName);
    if (imageType === CompanyImageType.Cover) {
      setCoverImageFileUrl(imageUrl);
    } else {
      setLogoImageFileUrl(imageUrl);
    }
  };

  const deleteImage = async (blobName: string, imageType: CompanyImageType) => {
    if (!blobName) {
      return false;
    }

    try {
      const isFileDeleted = await deleteFile('uploads', blobName);
      if (isFileDeleted) {
        const { data: isCompanyFileDeleted } = await deleteCompanyImage({
          variables: {
            imageType: imageType,
          },
        });

        return isCompanyFileDeleted;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCoverImage = async (file?: globalThis.File) => {
    if (currentCompany?.coverImageFile && deleteImages.coverImageDelete) {
      await deleteImage(
        currentCompany?.coverImageFile?.blobName,
        CompanyImageType.Cover
      );
    } else if (file) {
      await saveImage(file, CompanyImageType.Cover);
    }
  };

  const updateLogoImage = async (file?: globalThis.File) => {
    if (currentCompany?.logoImageFile && deleteImages.logoImageDelete) {
      await deleteImage(
        currentCompany?.logoImageFile?.blobName,
        CompanyImageType.Logo
      );
    } else if (file) {
      await saveImage(file, CompanyImageType.Logo);
    }
  };

  const handleDeleteFile = async (companyImageType: CompanyImageType) => {
    if (companyImageType === CompanyImageType.Cover) {
      setDeleteImages({
        coverImageDelete: true,
        logoImageDelete: deleteImages?.logoImageDelete,
      });
      setPreviewFiles({
        ...previewImages,
        coverImageUrl: {
          temporaryUrl: '',
        },
      });
    } else {
      setDeleteImages({
        coverImageDelete: deleteImages?.coverImageDelete,
        logoImageDelete: true,
      });
      setPreviewFiles({
        ...previewImages,
        logoImageUrl: {
          temporaryUrl: '',
        },
      });
    }
  };

  const handleCoverImageUpload = (file: globalThis.File) => {
    const temporaryUrl = URL.createObjectURL(file);
    setPreviewFiles({
      ...previewImages,
      coverImageUrl: {
        file,
        temporaryUrl,
      },
    });
  };

  const handleLogoUpload = (file: globalThis.File) => {
    const temporaryUrl = URL.createObjectURL(file);
    setPreviewFiles({
      ...previewImages,
      logoImageUrl: {
        file,
        temporaryUrl,
      },
    });
  };

  const reviewInformationSuccess = (chunk: React.ReactNode) => (
    <span className="text-success-400">{chunk}</span>
  );

  if (currentCompany?.type === CompanyType.Freelancer) {
    notFound();
  }

  return (
    <WithGuard permissions={['company:update']}>
      <BaseToolbarSub
        title={t('account.myCompany')}
        subtitle={t('account.editText')}
        tabs={basicMyCompanyToolbarTabs}
      />

      <div className="flex-grow xl:flex">
        <form
          className="flex-grow border-neutral-100 bg-white xl:border-r"
          onSubmit={handleSubmit}
        >
          <div className="divide-y-4 divide-gray-50">
            {hasActiveContractSlugs([ProductSlug.COMPANY_PREMIUM_PROFILE]) && (
              <Section>
                <div className="flex">
                  <div>
                    <BaseHeading type="h3" size="lg">
                      {t('company.branding')}
                    </BaseHeading>
                  </div>
                </div>
                <div className="flex flex-wrap gap-8">
                  <SingleFileUpload
                    label={t('company.logo.label')}
                    button={t('company.logo.button')}
                    footnote={t('company.logo.footnote')}
                    onUploadFile={handleLogoUpload}
                    onDeleteFile={() => handleDeleteFile(CompanyImageType.Logo)}
                    initialImageUrl={logoImageFileUrl}
                  />
                  <SingleFileUpload
                    label={t('company.coverImage.label')}
                    button={t('company.coverImage.button')}
                    footnote={t('company.coverImage.footnote')}
                    isCover
                    onUploadFile={handleCoverImageUpload}
                    onDeleteFile={() =>
                      handleDeleteFile(CompanyImageType.Cover)
                    }
                    initialImageUrl={coverImageFileUrl}
                  />
                </div>
              </Section>
            )}

            <Section>
              <BaseHeading type="h3" size="lg">
                {t('company.about')}
              </BaseHeading>
              <BaseTextarea
                label={t('company.aboutLabel')}
                placeholder={t('company.aboutPlaceholder')}
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                error={formErrors['about']}
              />
            </Section>

            {hasActiveContractSlugs([ProductSlug.COMPANY_PREMIUM_PROFILE]) && (
              <>
                <Section>
                  <BaseHeading type="h3" size="lg">
                    {t('company.video.title')}
                  </BaseHeading>
                  <BaseInput
                    label={t('company.video.label')}
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleInputChange}
                    type="text"
                    prepend="Youtube URL"
                    error={formErrors['youtubeUrl']}
                  />
                </Section>

                <Section>
                  <BaseHeading type="h3" size="lg">
                    {t('company.currentAssignments.title')}
                  </BaseHeading>
                  <BaseCheckbox
                    label={t('company.currentAssignments.label')}
                    name="showCurrentAssignments"
                    checked={formData.showCurrentAssignments}
                    onChange={handleCheckboxChange}
                  />
                </Section>

                <Section>
                  <BaseHeading type="h3" size="lg">
                    {t('company.employees.title')}
                  </BaseHeading>
                  <BaseCheckbox
                    label={t('company.employees.label')}
                    name="showEmployees"
                    checked={formData.showEmployees ?? false}
                    onChange={handleCheckboxChange}
                  />
                </Section>

                <Section>
                  {currentCompany && (
                    <CompanyReferencesList
                      currentCompany={currentCompany}
                      isEditable
                    />
                  )}
                </Section>
              </>
            )}

            {reviews.size > 0 && (
              <Section>
                <BaseHeading type="h3" size="lg">
                  {t.rich('company.reviewInformation', {
                    green: reviewInformationSuccess,
                    top: reviewInformation?.top,
                  })}
                </BaseHeading>
                <p className="text-sm font-medium text-neutral-700">
                  {t('company.reviewsSubtitle')}
                </p>

                {Array.from(reviews.values()).map((review) => {
                  return (
                    <div key={`review-${review.id}`} className="flex gap-4">
                      <BaseUserAvatar url="/demo/logo-ipsum.svg" size="md" />

                      <div className="flex-auto rounded-xl bg-neutral-50 p-6">
                        <div className="align-items-center mb-2 flex">
                          <span className={'text-success-400 mr-2 flex'}>
                            <IconThumbsUp />
                          </span>
                          <strong className="flex-auto text-sm font-semibold">
                            {review.createdBy?.firstName}{' '}
                            {review.createdBy?.lastName}
                          </strong>
                          <span className="text-sm text-neutral-500">
                            {new Intl.DateTimeFormat('nl-NL', {
                              dateStyle: 'medium',
                            }).format(new Date(review.createdAt))}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-700">
                          {review.content}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {skip < reviewCount - maxReviews && (
                  <div className="flex justify-center">
                    <BaseButton
                      size="lg"
                      theme="secondary"
                      loading={loading}
                      onClick={loadMoreReviews}
                    >
                      {t('company.loadMoreReviews')}
                    </BaseButton>
                  </div>
                )}
              </Section>
            )}
          </div>

          <div className="h-18 bottom-0 z-10 flex items-center justify-end border-t border-neutral-100 bg-white bg-white/90 px-5 backdrop-blur-sm lg:sticky lg:px-10">
            {success && (
              <div className="text-success-400 flex flex-nowrap items-center px-4 text-sm">
                <IconCheckmarkSm />
                <p className="text-xs">{global('successMessage')}</p>
              </div>
            )}
            <BaseButton type="submit" size="md">
              {global('save')}
            </BaseButton>
          </div>
        </form>
        <aside className="w-full xl:max-w-sm 2xl:max-w-md">
          {currentCompany && (
            <CompanyProfile
              isVisible
              company={currentCompany}
              previewEditCompanyImages={{
                coverImageUrl: previewImages?.coverImageUrl?.temporaryUrl,
                logoImageUrl: previewImages?.logoImageUrl?.temporaryUrl,
              }}
            />
          )}
        </aside>
      </div>
    </WithGuard>
  );
}

const Section: React.FC<{ children: any }> = ({ children }) => {
  return <section className="grid gap-6 p-5 lg:p-10">{children}</section>;
};
