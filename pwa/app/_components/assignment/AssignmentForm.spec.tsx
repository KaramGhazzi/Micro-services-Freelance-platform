import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidationError } from 'yup';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@package/translation/messages/nl.json';
import AssignmentForm, { AssignmentFormData } from './AssignmentForm';
import { ExpertiseType } from '@/graphql/types';

describe('AssignmentForm', () => {
  const initialFormData: AssignmentFormData = {
    title: 'Test',
    externalCode: 'Test',
    description: 'Test',
    contractType: 'Test',
    rateType: 'HOUR',
    rateFrom: 1,
    rateTo: 2,
    onLocation: 'Test',
    province: 'Test',
    place: 'Test',
    hideInDescription: false,
    customerRelation: 'Test',
    applicationDeadlineDate: '2023-01-01',
    startAsap: true,
    duration: 'Test',
    durationType: 'Test',
    durationExtendable: true,
    hoursFrom: 1,
    hoursTo: 2,
    startDate: '2023-01-01',
    expertises: [ExpertiseType.Administration],
    customerRelationCompany: undefined,
    customerRelationCompanyVisible: false,
  };

  const validationErrors: ValidationError[] = [];

  const mockValidationErrors = [
    { path: 'title', message: 'Title is wrong' } as ValidationError,
  ];

  const mockOnChange = jest.fn();

  const renderWithIntl = (children: React.JSX.Element) => {
    return render(
      <NextIntlClientProvider locale="nl" messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  };

  it('renders without crashing', () => {
    renderWithIntl(
      <AssignmentForm
        initialFormData={initialFormData}
        onFormDataChange={mockOnChange}
        validationErrors={validationErrors}
      />
    );
  });

  it('updates the formData onChange events', async () => {
    const { container } = renderWithIntl(
      <AssignmentForm
        initialFormData={initialFormData}
        onFormDataChange={mockOnChange}
        validationErrors={validationErrors}
      />
    );

    const input = container.querySelector("input[name='title']");
    expect(input).toBeDefined();
    fireEvent.change(input!, { target: { value: 'New Title' } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        ...initialFormData,
        rateFrom: initialFormData.rateFrom,
        rateTo: initialFormData.rateTo,
        hoursFrom: initialFormData.hoursFrom,
        hoursTo: initialFormData.hoursTo,
        title: 'New Title',
      });
    });
  });

  it('calls submitsForm when form is submitted', async () => {
    const mockSubmitForm = jest.fn();
    const { container } = renderWithIntl(
      <AssignmentForm
        initialFormData={initialFormData}
        onFormDataChange={mockOnChange}
        validationErrors={validationErrors}
        ref={mockSubmitForm}
      />
    );

    const form = container.querySelector('form');
    expect(form);
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalled();
    });
  });

  it('should report validity and focus on first invalid input when validationErrors is non-empty', async () => {
    const { container, rerender } = renderWithIntl(
      <AssignmentForm
        onFormDataChange={jest.fn()}
        validationErrors={mockValidationErrors}
      />
    );

    // Mocking the reportValidity method and focus method
    const mockReportValidity = jest.fn(() => false);

    // Get reference to the form element
    const form = container.querySelector('form');
    expect(form);
    // Overriding form's reportValidity and focus methods for our mock
    window.HTMLFormElement.prototype.reportValidity = mockReportValidity;

    // Modify the title field to be invalid
    const titleInput = container.querySelector('input[name="title"]');
    const hoursFromInput = container.querySelector('input[name="hoursFrom"]');
    expect(titleInput);
    expect(hoursFromInput);
    fireEvent.change(titleInput!, { target: { value: '' } }); // Set to whatever is considered invalid by your component
    fireEvent.change(hoursFromInput!, { target: { value: -1 } }); // Set to whatever is considered invalid by your component

    // Submit the form
    fireEvent.submit(form!);

    const mockValidationErrors2 = [
      ...mockValidationErrors,
      {
        path: 'hoursFrom',
        message: 'dude, this is below zero',
      } as ValidationError,
    ];

    rerender(
      <NextIntlClientProvider locale="nl" messages={messages}>
        <AssignmentForm
          onFormDataChange={jest.fn()}
          validationErrors={mockValidationErrors2}
        />
      </NextIntlClientProvider>
    );

    expect(mockReportValidity).toBeCalled();
  });
});
