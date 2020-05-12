import React, { useImperativeHandle, useState, forwardRef } from 'react';
import ReactMde from 'react-mde';
import { Converter } from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Button } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useTranslation } from '_core/i18n';
import { defaultFontColor } from '_theme';

const converter = new Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Container = styled.div`
   ${props => props.theme.mode === 'dark' ? `

    & .react-mde {
      background: #292c35
    }

    ` : ''};
`;

const MDEStyle = createGlobalStyle`
  ${props => props.theme.mode === 'dark' ? `
    .react-mde {
      border-color: #424c58;
    }

    .react-mde .mde-tabs button {
      color: #e0e0e0;
    }

    .react-mde .mde-tabs button.selected {
      color: #e0e0e0;
      background-color: #292c35;
      border-color: #424c58;
    }

    .mde-header {
      background: none;
      border-color: #424c58;
    }

    .react-mde .grip > svg > path {
      fill: #424c58;
    }

    .react-mde textarea {
      background: none;
      color: ${defaultFontColor};
    }

    .react-mde .grip {
      background: none;
      border-color: #424c58;
    }

    .mde-header-item  svg > path {
      fill: #ececec;
    }
  ` : ''};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function MarkdownEditor(props, ref) {
  const { className = '', defaultValue = '', daufoutTab = 'write', loggedIn = true } = props;
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState(daufoutTab);
  const { t } = useTranslation();

  const onSave = () => {
    props.onSave(value);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    onSave,
    setValue
  }));

  return (
    <Container className={className}>
      <MDEStyle />
      <ReactMde
        l18n={{
          write: t('mde-write'),
          preview: t('mde-preview')
        }}
        value={value}
        onChange={setValue}
        selectedTab={tab}
        onTabChange={setTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />
      {props.onSave && loggedIn ? (
        <ActionButtons>
          <Button
            type='primary'
            disabled={!value}
            onClick={onSave}
            className='ml-auto mt-2'
          >
            {t('submit-message')}
          </Button>
        </ActionButtons>
      ) : null}
    </Container>
  );
}

export default forwardRef(MarkdownEditor);
