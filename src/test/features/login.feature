Feature: User Authentication tests

  Background: 
    Given User navigates to the "https://bookcart.azurewebsites.net/"
    And User click on the login link

  Scenario: Login should be success
    And User enter the "username.correct" on field "Username.xpath" from "login" Page
    # And User enter the username as "ortoni11"
    And User enter the password as "Pass1234"
    When User click on the login button
    Then Login should be success

  
  Scenario: Login should not be success
    Given User enter the "username" on field "Username.xpath" from "login" Page
    Given User enter the password as "Ahad"
    When User click on the login button
    But Login should fail