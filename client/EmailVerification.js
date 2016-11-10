import React from 'react'
import { verifyEmail, resendVerificationEmail } from 'meteor-apollo-accounts'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ApolloClient } from './index'

class EmailVerification extends React.Component {

  async resend(){
    try {
      const response = await resendVerificationEmail({email}, ApolloClient)
      console.log('response', response)
    } catch (error) {
      alert(error)
    }
  }

  async componentDidMount() {
    var {params, data} = this.props;
    if(params && params.token){
      try {
        const response = await verifyEmail({token}, ApolloClient)
        console.log('response', response)
        data.refetch()
      } catch (error) {
        alert(error)
      }
    }
  }

  render() {
    console.log(this.props)
    let { me, loading } = this.props.data
    let { token } = this.props.params
    let verified = false
    if(me){
      verified = me.emails[0].verified
    }
    console.log(token, verified)

    return (loading || !me) ? (<p>Loading...</p>) : (
      <div>

        { (!token && !verified) ? <p>Please check your email account for a verification email.</p> : '' }

        { verified ? <p>Your email has been verified.</p> : '' }

        { (token && !verified) ? <p>Email could not be verified.</p> : '' }

        { !verified ? <form onSubmit={this.resend.bind(this)}>

          <label>Email: </label>
          <input
          defaultValue="user@example.com"
          type="email"
          ref="email" />
          <br />

          <button type="submit">Send</button>
        </form> : '' }

      </div>
    );
  }
}

const getCurrentUser = gql`
query getCurrentUser {
  me {
    emails {
      verified
    }
  }
}
`
EmailVerification = graphql(getCurrentUser)(EmailVerification)

export default EmailVerification
