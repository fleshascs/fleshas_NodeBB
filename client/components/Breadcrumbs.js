import React from 'react';
import Link from 'next/link';
import { useTranslation, translateNodeBBTemplate } from '_core/i18n';

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <Breadcrumb
              breadcrumb={breadcrumb}
              index={index + 1}
              breadcrumbsNum={breadcrumbs.length}
              key={breadcrumb.text}
            />
          );
        })}
      </ol>
    </nav>
  );
};

function Breadcrumb({ breadcrumb, breadcrumbsNum, index }) {
  const { t } = useTranslation();
  const isActive = breadcrumbsNum === index;
  const classes = 'breadcrumb-item' + (isActive ? ' active' : '');
  const text = translateNodeBBTemplate(breadcrumb.text, t);

  return (
    <li className={classes}>
      {!isActive ? (
        <Link href={breadcrumb.url}>
          <a dangerouslySetInnerHTML={{ __html: text }} />
        </Link>
      ) : (
        <span dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </li>
  );
}

export default Breadcrumbs;
