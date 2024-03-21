import React from 'react'
import { Container } from 'react-bootstrap'

const Loading = ({show}) => {
    return show && (
       <Container>
           <div className="loader"></div>
       </Container>
    )
}
export default Loading