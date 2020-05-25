import React from 'react';
import { Tag, Card } from 'antd';
import { RequestDataRow } from 'areas/lost_priv/components/RequestDataRow';

function translate(key) {
  const keys = {
    id: 'Request ID',
    Name: 'Nickname',
    PhoneNr: 'Phone Number',
    Email: 'Email',
    Date: 'Purchase Date',
    Description: 'Description',
    Checked: 'Request status',
    SteamId: 'SteamId',
    MoveTo: 'Move to',
    MoveToPw: '',
    BoughtOn: 'Bought on',
    PaymentMethod: ''
  };
  return keys[key] ?? key;
}

export function RequestInfo({ request }) {
  return (
    <Card title='Details for admin' bordered={false}>
      {Object.keys(request).map((key) => {
        if (!request[key]) return null;
        let value = request[key];
        if (key === 'Checked') {
          switch (value) {
            case '0':
              value = <Tag color='blue'>Waiting for admin to review</Tag>;
              break;
            case '1':
              value = <Tag color='green'>Approved</Tag>;
              break;
            case '2':
              value = <Tag color='red'>Rejected</Tag>;
              break;
          }
        }
        return <RequestDataRow title={translate(key)} value={value} />;
      })}
    </Card>
  );
}
