import React, { useState, useCallback } from 'react';
import { Menu, Dropdown } from 'antd';
import { getAvailableTools } from '../../services';

export default function ActionsMenu({ post, onChoose }) {
  const [tools, setTools] = useState([]);

  const onVisibleChange = useCallback(async (isVisible) => {
    if (!isVisible) return;
    const tools = await getAvailableTools(post);
    setTools(tools);
  }, []);

  const getMenu = useCallback(() => {
    return (
      <Menu>
        {tools.map((item) => (
          <Menu.Item key={item.name}>
            <MenuItem item={item} onChoose={onChoose} />
          </Menu.Item>
        ))}
        {!tools.length ? (
          <div className='px-2 pb-2 text-center'>
            <div style={{ fontFamily: 'Segoe UI Emoji', fontSize: '3.5em' }}>🍌</div>Nothing to see
            here{' '}
          </div>
        ) : null}
      </Menu>
    );
  }, [tools]);

  return (
    <Dropdown overlay={getMenu()} onVisibleChange={onVisibleChange} trigger={['click']}>
      <a className='ant-dropdown-link px-2' href='#'>
        <i className='material-icons' style={{ color: '#969a9c' }}>
          expand_more
        </i>
      </a>
    </Dropdown>
  );
}

function MenuItem({ item, onChoose }) {
  const _onChoose = useCallback(() => {
    onChoose(item);
  }, []);

  return (
    <a href='#' onClick={_onChoose}>
      {item.name}
    </a>
  );
}
