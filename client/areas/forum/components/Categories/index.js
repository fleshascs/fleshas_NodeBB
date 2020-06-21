import React, { Component } from 'react';
import Category from './Category';
import { Container } from './Category.css';
import styled from 'styled-components';
import { boxBGColor, rowBorderColor } from '_theme';

const CategoriesContainer = styled.div`
  box-shadow: rgba(109, 103, 95, 0.22) 1px 3px 6px;
  position: relative;
  background: ${boxBGColor};

  & > ${Container} + ${Container} {
    border-top: solid 1px ${rowBorderColor};
  }
`;

const Section = styled.div`
  background: #292c35;
  padding: 1rem;
  color: #ffca3e;
`;

export default function Categories(props) {
  const categories = props.categories || [];
  return (
    <CategoriesContainer>
      {categories.map((category) => {
        if (category.isSection) {
          const components = [];
          components.push(
            <Section key={category.cid} dangerouslySetInnerHTML={{ __html: category.name }} />
          );
          const childCategories = category.children.map((childCategory) => {
            return <Category category={childCategory} key={childCategory.cid} />;
          });
          return components.concat(childCategories);
        }
        return <Category category={category} key={category.cid} />;
      })}
    </CategoriesContainer>
  );
}
