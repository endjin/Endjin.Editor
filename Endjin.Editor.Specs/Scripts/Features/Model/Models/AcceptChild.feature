Feature: Models will only accept valid children
	In order to generate valid HTML
	As a developer
	I want models to accept only valid children

Scenario Outline: Adding valid children to a model
	Given I have a model of type "<Parent>" called "first"
	And I have a model of type "<Child>" called "second"
	When I add "second" to "first"
	Then the result should be a Selection
	And "first" should contain "second"

	Examples: 
	| Parent        | Child                     |
	| HeadingLevel1 | Abbreviation              |
	| HeadingLevel1 | Anchor                    |
	| HeadingLevel1 | Area                      |
	| HeadingLevel1 | BidirectionalIsolation    |
	| HeadingLevel1 | BidirectionalTextOverride |
	| HeadingLevel1 | Break                     |
	| HeadingLevel1 | BringToAttention          |
	| HeadingLevel1 | Button                    |
	| Anchor        | Address                   |
	| Anchor        | BlockQuote                |

Scenario Outline: Adding invalid children to a model
	Given I have a model of type "<Parent>" called "first"
	And I have a model of type "<Child>" called "second"
	When I add "second" to "first"
	Then the result should be null
	And "first" should not contain "second"

	Examples: 
	| Parent        | Child         |
	| HeadingLevel1 | HeadingLevel1 |
	| Anchor        | Anchor        |