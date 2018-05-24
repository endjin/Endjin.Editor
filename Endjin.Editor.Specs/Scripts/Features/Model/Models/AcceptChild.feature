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
	| HeadingLevel1 | HeadingLevel2 |
	| HeadingLevel1 | HeadingLevel3 |
	| HeadingLevel1 | HeadingLevel4 |
	| HeadingLevel1 | HeadingLevel5 |
	| HeadingLevel1 | HeadingLevel6 |
	| HeadingLevel2 | HeadingLevel1 |
	| HeadingLevel2 | HeadingLevel2 |
	| HeadingLevel2 | HeadingLevel3 |
	| HeadingLevel2 | HeadingLevel4 |
	| HeadingLevel2 | HeadingLevel5 |
	| HeadingLevel2 | HeadingLevel6 |
	| HeadingLevel3 | HeadingLevel1 |
	| HeadingLevel3 | HeadingLevel2 |
	| HeadingLevel3 | HeadingLevel3 |
	| HeadingLevel3 | HeadingLevel4 |
	| HeadingLevel3 | HeadingLevel5 |
	| HeadingLevel3 | HeadingLevel6 |
	| HeadingLevel4 | HeadingLevel1 |
	| HeadingLevel4 | HeadingLevel2 |
	| HeadingLevel4 | HeadingLevel3 |
	| HeadingLevel4 | HeadingLevel4 |
	| HeadingLevel4 | HeadingLevel5 |
	| HeadingLevel4 | HeadingLevel6 |
	| HeadingLevel5 | HeadingLevel1 |
	| HeadingLevel5 | HeadingLevel2 |
	| HeadingLevel5 | HeadingLevel3 |
	| HeadingLevel5 | HeadingLevel4 |
	| HeadingLevel5 | HeadingLevel5 |
	| HeadingLevel5 | HeadingLevel6 |
	| HeadingLevel6 | HeadingLevel1 |
	| HeadingLevel6 | HeadingLevel2 |
	| HeadingLevel6 | HeadingLevel3 |
	| HeadingLevel6 | HeadingLevel4 |
	| HeadingLevel6 | HeadingLevel5 |
	| HeadingLevel6 | HeadingLevel6 |
	| Anchor        | Anchor        |