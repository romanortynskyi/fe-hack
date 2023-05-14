import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation LOGIN($input: UserInput!) {
    login(input: $input) {
      id
      firstName
      lastName
      email
      role
      token
      image {
        src
      }
    }
  }
`
