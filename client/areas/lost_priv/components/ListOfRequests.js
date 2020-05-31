import React, { useEffect, useState } from 'react';
import { Tag, Spin } from 'antd';
import { NumberOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styled from 'styled-components';
import { Box } from 'ui';

const RequestLink = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #0000001a;
  }
`;
const Requests = styled.div`
  & > ${RequestLink} + ${RequestLink} {
    border-top: solid 1px rgba(0, 0, 0, 0.12);
  }
`;

export function ListOfRequests({ requests, loading }) {
  return (
    <Box headerText='Your requests' className='mt-3'>
      <div className='p-2'>
        {loading ? (
          <Spin className='p-2' />
        ) : (
          <Requests>
            {!requests?.length ? 'You have not created any requests yet.' : null}
            {requests.map((request) => (
              <Request {...request} />
            ))}
          </Requests>
        )}
      </div>
    </Box>
  );
}

function Request({ Checked, id }) {
  const [requestState, setRequestState] = useState(null);
  useEffect(() => {
    let requestState = null;
    switch (Checked) {
      case '0':
        requestState = <Tag color='blue'>Waiting for admin to review</Tag>;
        break;
      case '1':
        requestState = <Tag color='green'>Approved</Tag>;
        break;
      case '2':
        requestState = <Tag color='red'>Rejected</Tag>;
        break;
    }
    setRequestState(requestState);
  }, [Checked]);

  return (
    <Link href={`/lost-priv/${id}`} as={`/lost-priv/${id}`} passHref>
      <RequestLink className='p-2 d-flex'>
        <div>
          <NumberOutlined /> {id}
        </div>
        <div className='ml-auto'>{requestState}</div>
      </RequestLink>
    </Link>
  );
}
