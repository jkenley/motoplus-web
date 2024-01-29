import { Box, Button, Divider, Text } from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';

import { WEB_URL } from '@/lib/constants';
import useStore from '@/store/store';

interface QRCodeProps {
  value: string;
}

const QRCodeBox: React.FC<QRCodeProps> = ({ value }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <QRCodeSVG value={`${WEB_URL}/qrcode/${value}`} size={120} level="M" />
      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '.8rem', color: '#343947' }}>{value}</p>
    </div>
  );
};

const ListQRCode: React.FC = () => {
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { qrCodes } = useStore();

  useEffect(() => {
    if (labelRef.current) {
      const svgElements = Array.from(labelRef.current.querySelectorAll('svg'));
      const svgStrings = svgElements.map((svg) => svg.outerHTML);

      if (svgStrings.length > 0) {
        console.log(`${svgStrings.length} códigos QR generados`);
      }
    }
  }, [qrCodes]);

  // Function to handle print action
  const handleActions = (action: 'print') => {
    if (action !== 'print' || !labelRef.current) {
      setError('No QR codes to print.');
      return;
    }

    try {
      const printWindow = window.open('', '_blank');

      if (!printWindow) throw new Error('Failed to open print window.');

      printWindow.document.write(labelRef.current.outerHTML);
      printWindow.document.close();
      printWindow.print();
    } catch (error) {
      setError('An error occurred while printing.');
    }
  };

  if (qrCodes?.length === 0 || !qrCodes) {
    return;
  }

  return (
    <>
      <Divider bg="#eaeaea" height="1px" mb={6} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text fontSize="1rem" fontWeight="600" fontFamily="body" color="#343947">
          {qrCodes?.length} códigos QR generados
        </Text>

        <Button
          height="32px"
          fontFamily="body"
          fontSize=".8rem"
          borderRadius="3px"
          color="white"
          bg="#de392c"
          transition="all .2s ease-in-out"
          onClick={() => handleActions('print')}
          _hover={{
            bg: '#000',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
            <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
            <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
          </svg>
          <Box ml={1} as="span" textTransform="uppercase">
            Print Labels
          </Box>
        </Button>
      </div>

      <br />

      <div
        ref={labelRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}
      >
        {qrCodes?.map((item) => (
          <div
            key={item.qrCode}
            style={{
              borderRadius: '2px',
              border: '1px solid #eaeaea',
              padding: '32px 28px',
            }}
          >
            <QRCodeBox value={item.qrCode} />
          </div>
        ))}
      </div>

      <br />
      <br />

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
};

export default ListQRCode;
