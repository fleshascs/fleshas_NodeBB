import React, { useState, useCallback } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { getAvailableModeratorTools } from '../../services';

export default function ActionsMenu({ topic, onChoose }) {
  const [tools, setTools] = useState([]);

  const onVisibleChange = useCallback(async (isVisible) => {
    if (!isVisible) return;
    const tools = await getAvailableModeratorTools(topic);
    setTools(tools);
  }, []);

  const getMenu = useCallback(() => {
    return (
      <Menu>
        {tools.map((item) => (
          <Menu.Item key={item.index}>
            <MenuItem
              item={item}
              title={item.stateTexts[Number(topic[item.stateIndex])]}
              onChoose={onChoose}
            />
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [tools]);

  return (
    <Dropdown overlay={getMenu()} onVisibleChange={onVisibleChange} trigger={['click']}>
      <Button className='ant-dropdown-link px-2'>Topic tools</Button>
    </Dropdown>
  );
}

function MenuItem({ item, title, onChoose }) {
  const _onChoose = useCallback(() => {
    onChoose(item);
  }, []);

  return (
    <a href='#' onClick={_onChoose}>
      {title}
    </a>
  );
}
