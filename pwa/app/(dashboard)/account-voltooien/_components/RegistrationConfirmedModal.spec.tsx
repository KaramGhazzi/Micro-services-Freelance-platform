import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@package/translation/messages/nl.json';
import RegistrationConfirmedModal from './RegistrationConfirmedModal';

const renderWithIntl = (children: React.JSX.Element) => {
  return render(
    <NextIntlClientProvider locale="nl" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

it('renders without crashing', () => {
  const mockOnClose = jest.fn();
  const isOpen = false;
  renderWithIntl(
    <RegistrationConfirmedModal isOpen={isOpen} onClose={mockOnClose} />
  );
});
