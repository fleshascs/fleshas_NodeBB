import React from 'react';


class Index extends React.Component {
  static async getInitialProps({ query, store, req }) {
    
    return {
     
      header: query.header,
      categories: query.screenData.categories,

    };
  }
 
  render() {

    return (
      <div className='container mt-3'>
        categories
         {JSON.stringify(this.props.categories)}
         <hr/>
         {JSON.stringify(this.props.header)}
      </div>
    );
  }
}

export default Index;
