Feature: AnchorModel will only accept valid children
	In order to generate valid HTML
	As a developer
	I want HeadingLevel1Model to accept only valid children

@mytag
Scenario: Adding a HeadingLevel1Model to a HeadingLevel1Model
	Given I have a model of type "HeadingLevel1Model" called "first"
	And I have a model of type "HeadingLevel1Model" called "second"
	When I add "second" to "first"
	Then the result should be null
	And "first" should not contain "second"

Scenario: Adding an AnchorModel to a HeadingLevel1Model
	Given I have a model of type "HeadingLevel1Model" called "first"
	And I have a model of type "AnchorModel" called "second"
	When I add "second" to "first"
	Then the result should be a Selection
	And "first" should contain "second"
