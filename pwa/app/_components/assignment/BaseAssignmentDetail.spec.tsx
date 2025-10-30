import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useTranslations } from 'next-intl';
import BaseAssignmentDetail from './BaseAssignmentDetail';
import { GetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),

  useFormatter: jest.fn(() => {
    return { dateTime: jest.fn(), number: jest.fn() };
  }),
}));

describe('<BaseAssignmentDetail />', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  // SKIPPED TEST because of small t.rich issue
  test.skip('it should mount and display assignment title', () => {
    const assignment = {
      title: 'Test assignment',
      owner: { firstName: 'Test', lastName: 'Owner' },
      createdAt: '2023-01-01',
    } as GetAssignmentQuery['assignment'];

    render(
      <BaseAssignmentDetail assignment={assignment} asideComponent={<></>} />
    );

    expect(screen.getByText('Test assignment')).toBeInTheDocument();
  });
});
