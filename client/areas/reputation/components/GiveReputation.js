import React, { useRef, useState } from 'react';
import { Radio } from 'antd';
import MarkdownEditor from 'ui/markdownEditor';
import { useTranslation } from '_core/i18n';
import RepType from 'areas/reputation/components/RepType';

export default function GiveReputation(props) {
  const { onSubmit, notEnoughPosts, canGive, alreadyGave } = props;
  const { t } = useTranslation();
  const markdownEditor = useRef(null);
  const [repType, setRepType] = useState(1);
  const onChange = (e) => {
    setRepType(e.target.value);
  };
  const onMarkdownSubmit = (text) => {
    onSubmit(text, repType, () => {
      markdownEditor.current.setValue('');
    });
  };
  if (alreadyGave) return t('reputation-already-gave');
  if (notEnoughPosts) return t('reputation-not-enouth-posts');
  if (canGive)
    return (
      <>
        <Radio.Group onChange={onChange} value={repType}>
          <Radio value={1}>
            <RepType type={1} />
          </Radio>
          <Radio value={0}>
            <RepType type={0} />
          </Radio>
          <Radio value={2}>
            <RepType type={2} />
          </Radio>
        </Radio.Group>
        <div className='mt-2'>
          <MarkdownEditor ref={markdownEditor} onSave={onMarkdownSubmit} loggedIn={true} />
        </div>
      </>
    );

  return "You can't give reputation to this user.";
}
