Feature: AnchorModel will only accept valid children
	In order to generate valid HTML
	As a developer
	I want AnchorModel to accept only valid children

@mytag
Scenario: Adding an AnchorModel to an AnchorModel
	Given I have an AnchorModel called "first"
	And I have an AnchorModel called "second"
	When I add "second" to "first"
	Then the result should be null
	And "first" should not contain "second"
