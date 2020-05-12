import React from 'react';


class Index extends React.Component { 

  static async getInitialProps({ query, req }) {
    const isServer = !!req;

    // if (!isServer) {
    //   const response = await axios.get('/api/recent');
    //   query.recent = response.data;
    // }

    return {
      recent: query.recent,
      namespacesRequired: ['common']
    };
  }
  render() {
    return (
      <div className='container mt-3'>
        index 
        {JSON.stringify(this.props.recent)}
      </div>
    );
  } 
}

export default Index;
