import React from 'react'

const About = () => {
  return (
    <div>
      <h3>About this application</h3>
      <p>
        This application is developed for technoical challenge purpose by Tai Pang. <br/>
        This application is not for use in any other purpose. <br/><br/>
        Some functions are suppose to implemented in backend and connect with database, however, in this application, everything is simplified. Such as: <br/><br/>
        1. Add Short Note should call the backend API and insert into database.<br/>
        2. Display Short Notes should call the backend API and fetch data from database.<br/><br/>
        In this application, they are implemented existed initally in the API and will not save newly added short note into database permanently.<br/><br/>
        Date: 11/03/2021
      </p>
    </div>
  )
}

export default About;
