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

class Categories extends Component {
  render() {
    const categories = this.props.categories || [];
    return (
      <CategoriesContainer>
        {categories.map((category) => (
          <Category category={category} key={category.cid} />
        ))}
      </CategoriesContainer>
    );
  }
}

export default Categories;
