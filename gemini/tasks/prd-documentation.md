# PRD: Update Documentation Page for each component in kotti-ui

## Overview

This document outlines the requirements for updating the documentation page for a component in the Kotti UI library. The goal is to create a clear, concise, and interactive documentation page that is easy to understand and use for designers and front-end developers.

## Components

Here is a list of all existing components. Some of them are organized into groups if there is a connection between them. Grouped components should be documented on the same page.

### structural or layout focused components

These are "simple" components that contain common ui elements like navigation bars or organize layout like accordions or banners. For these components the documentation can be concise and to the point. The goal should be to make users understand them quickly, as there is not much to them.

- KtAccordion
- KtActionbar
- KtAvatar
  - KtAvatarGroup
- KtBanner
- KtBreadcrumb
- KtCard
- KtDrawer
- KtHeading
- KtLine
- KtModal
- KtNavbar
- KtTag
- KtUserMenu
- KtValueLabel

### functionally complex components

These components range from somewhat complex (like buttons) to very complex (like tables). For those there should be more small articles showcasing various usecases and how important props and in some cases hook functions are used.

- KtButton
  - KtButtonGroup
- KtComment
- KtField
  - KtFieldCurrency
  - KtFieldDate
  - KtFieldFileUpload
  - KtFieldInlineEdit
  - KtFieldNumber
  - KtFieldPassword
  - KtFieldRadioGroup
  - KtFieldSelect
  - KtFieldText
  - KtFieldTextArea
  - KtFieldToggle
  - KtFileUpload
- KtFilters
- KtForm
  - KtFormControllerList
  - KtFormControllerObject
  - KtFormSubmit
- KtPagination
- KtPopover
- KtToaster
- KtTable

## Goals

- Provide a clear and concise explanation of the components' purpose and usage.
- auto-generate a list of all relevant props and slots by using `ComponentInfo.vue`
- Showcase the component's props and how they can be used to customize its appearance and behavior.
  - Use `CodePreview.vue` for code examples
- Create an interactive demo using `ComponentForm.vue` to allow users to experiment with the component's props.
- Follow the established documentation guidelines for the Kotti UI library.

## User Stories

- As a designer, I want to quickly understand the purpose of the component and see how it can be used in different contexts.
- As a front-end developer, I want to easily find the component's props and their descriptions.
- As a junior developer, I want to be able to copy and paste the code examples and use them in my project.
- As a user, I want to be able to interactively experiment with the component's props to see how they affect its appearance and behavior.

## Functional Requirements

The documentation pages should include the following sections:

1.  **Props & Slots:** simply use the `ComponentInfo.vue` for this
2.  **Overview:** A brief description of the component and its purpose.
3.  **Interactive Demo:** An interactive demo using `ComponentForm.vue` that allows users to modify all props
4.  **Code Examples:** Clear and concise code examples demonstrating how to use the component in different scenarios using `CodePreview.vue`
5.  **Notes:** denote limitations

## Non-Goals

- Detailed explanation of the component's implementation.
- Advanced customization options beyond the standard props.

## Design Considerations

- The documentation page should follow the established design guidelines for the Kotti UI library.
- before doing any changes, the existing documentation pages should be checked for their merits and to see what works and what doesn't
- The interactive demo should be easy to use and understand.
- The code examples should be clear, concise, and easy to copy and paste.
- if the component is complex, they should be planned individually, as they will likely have special things that need to happen on their documentation.

## Success Metrics

- The documentation page is complete and accurate.
- The interactive demo is functional and easy to use.
- The code examples are clear and concise.
- Users can easily find the information they need on the documentation page.
