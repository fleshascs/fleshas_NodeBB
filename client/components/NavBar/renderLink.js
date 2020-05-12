import React from 'react';
import Link from 'next/link';

export function renderLink(url, component) {
  if (url.isNextlink) {
    return (
      <Link href={url.to} passHref>
        {component}
      </Link>
    );
  }
  return component;
}
