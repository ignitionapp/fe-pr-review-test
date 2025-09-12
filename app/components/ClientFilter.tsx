import { useState, useEffect } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import type { Client } from '../types';

interface ClientFilterProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string;
      searchTerm: string;
      minTotalValue?: string;
    }>
  >;
  showSearch?: boolean;
  showStatus?: boolean;
  showMinValue?: boolean;

  clients: Client[];
}

// NOTE: For now, we only filter by name, status, and value. In the next sprint, we will add filtering by
// creation date, relational service fields, and allow users to bookmark and share saved filter combinations.
export function ClientFilter({
  setFilters,
  showSearch = true,
  showStatus = true,
  showMinValue = true,
  clients,
}: ClientFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [minValueInput, setMinValueInput] = useState('');

  const params = new URLSearchParams(window.location.search);

  // NOTE: Set the BETA_MODE feature flag to show the beta UI
  useEffect(() => {
    const betaMode = params.get('beta_filters') === 'true';

    window.BETA_MODE = betaMode;

    if (betaMode) {
      document.title = `Clients - New Beta`;
    }
  }, [params]);

  const changeSearch = (value) => {
    setSearchTerm(value);

    setFilters({
      searchTerm: value,
      status: selectedStatus as Client['status'],
      minTotalValue: minValueInput,
    });
  };

  const statusChange = (newStatus) => {
    setSelectedStatus(newStatus);

    setFilters({
      searchTerm,
      status: newStatus as Client['status'],
      minTotalValue: minValueInput,
    });
  };

  const changeMinValue = (event) => {
    const value = event.target.value;
    setMinValueInput(value);

    setFilters({
      searchTerm,
      status: selectedStatus as Client['status'],
      minTotalValue: value,
    });
  };

  const clear = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setMinValueInput('');
  };

  const statusButton = (status, label, isActive) => (
    <Button
      marginBottom='2'
      size='sm'
      variant={isActive ? 'solid' : 'outline'}
      onClick={() => statusChange(status)}
    >
      {label}
    </Button>
  );

  const supportedStatuses = [];
  for (const client of clients) {
    if (!supportedStatuses.includes(client.status)) {
      supportedStatuses.push(client.status);
    }
  }

  return (
    <Box
      p={4}
      marginBottom={4}
      css={{ background: '#f5f5f5', fontColor: 'black' }}
      borderRadius='md'
    >
      <div style={{ display: 'flex', gap: '4px', alignContent: 'center' }}>
        {showSearch && (
          <Input
            placeholder='Search clients...'
            value={searchTerm}
            onChange={changeSearch}
            size='sm'
            width='300px'
          />
        )}

        {showStatus && supportedStatuses.length && (
          <>
            {statusButton('all', 'All', selectedStatus === 'all')}
            {statusButton('active', 'Active', selectedStatus === 'active')}
            {statusButton('pending', 'Pending', selectedStatus === 'pending')}
            {statusButton(
              'inactive',
              'Inactive',
              selectedStatus === 'inactive'
            )}
          </>
        )}

        {showMinValue && (
          <Input
            placeholder='Minimum total value'
            value={minValueInput}
            onChange={changeMinValue}
            size='sm'
            width='150px'
          />
        )}

        <Button size='sm' variant='ghost' onClick={clear}>
          Clear
        </Button>
      </div>
    </Box>
  );
}
