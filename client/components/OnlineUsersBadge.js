import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { useTranslation } from '_core/i18n';

export const ViewerCount = styled.span`
  color: #6c757d;
  font-size: 0.9em;
  display: flex;
  align-items: center;
`;

export default ({ online }) => {
  const { t } = useTranslation();

  return (
    <Tooltip placement='left' title={t('online-count-tooltip')}>
      <ViewerCount>
        <span
          className='material-icons'
          style={{
            fontSize: '1.3em',
            marginRight: '4px'
          }}
        >
          person
        </span>
        {online}
      </ViewerCount>
    </Tooltip>
  );
};
