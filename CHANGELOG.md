# Change Log

## 1.3.0 - 2019.02.01

_Chinese New Year Update_

- Fixed: icon type in `yoco` example
- Fixed: table control misplaced in Firefox Dev Version
- Added: support for disable function in `KtTable`
- Added: change order of the column by drag & drop in `KtTable`

# 1.2.2 - 2019.01.30

- Fixed: potential security issue in KtComment when enabling HTML support

## 1.2.1 - 2019.01.24

- Fixed: Add word-break to comment message and comment reply message
- Fixed: Loading state leaving already loaded columns visible
- Added: Support for passing 1 or -1 in the sortedColumn prop as a possible
  sortOrder value
- Fixed: id in KtComment can now be Number or String

## 1.2.0 - 2019.01.15

- Fixed: KtInput should link label to the field #38
- Added: Support Custom Table Slots and Sort in KtTable #35

## 1.1.0 - 2018.12.21

_Winter Solstice Update_

- Fixed: Prevent Narrow Button LogoClick
- Added: Using Vue-Popper for popover/tooltip component- Added: KtSteps and
  KtStep componet
- Added: allowChange props to KtComments

## 1.0.1 - 2018.12.05

- Added: New icons in yoco
- Fixed: KtInput label overlaps placeholder when it is `isCompact`
- Fixed: Added KtLine into package
- Fixed: KtDatePicker layout problem caused by inline-block
- Fixed: KtAvatar overlay when tooltip show

## 1.0.0 - 2018.12.05

**Breaking Changes**

**This release upgrades the vue/cli for nuxt and build process. The style entry
point is also changed from last version. Please check README for installation
guides.**

- Fxied: Nuxt to use Kotti globally
- Added: Merge vue-yodify into Kotti- Added: KtActionbar and KtPagination to the
  package
- Changed: KtComments switch to inline reply
- Added: When no logoUrl show text of the lable
- Added: Label Props Supports in KtButton

<details>
<summary><strong>Older Versions</strong></summary>

## 0.0.14 - 2018.11.30

- Fixed: KtAvatarGroup change the z-index causes element overlapping
- Added: Click event to KtNavbar
- Added: Cutomizable themes to KtButtons
- Added: More stronger shadows to the KtUserMenu

## 0.0.13 - 2018.11.20

- Fixed: Cannot click icon in KtSelect
- Fixed: Duplicated slot name in KtActionBar
- Fixed: Cannot Rest KtSelect to Null
- Fixed: KtButton new styles break the text-align
- Added: New KtNavBar styles
- Added: Update KtUserMenu to new style

## 0.0.12 - 2018.11.02

- Added: New KtButton style with 3 sizes
- Added: Horizontal Row
- Added: Support Wider in KtDrawer
- Fixed: Remove duplicated December in KtDatepicker
- Fixed: KtSingleSelect doesn't response

## 0.0.11 - 2018.10.25

- Fixed: handling of initial values in KtSelect and KtDatepicker

## 0.0.10 - 2018.10.15

- Fixed: Support step for KtInput

## 0.0.9 - 2018.09.18

- Added: Components for ActionBar, ActionBarMenu

## 0.0.8 - 2018.09.11

- Fixed: Navbar no longer highlights selected tabs
- Fixed: KtSelect When Label is Clicked, the Dropdown doesn’t close
- Fixed: KtRadio Only Works With Default Slot
- Fixed: Yoco Start should be Star
- Fixed: KtInlineEdit z-index and invalid message
- Added: Support Asynchronous Options in Select
- Added: KtInput Description Support
- Added: Popover component

## 0.0.7 - 2018.08.31

- Fixed: Remove KtModal empty slots space
- Added: Include text css utilities in documents
- Added: Required Indicator for KtInput

## 0.0.6 - 2018.08.28

- Added: Pagination component
- Fixed: Support IE 11

## 0.0.5 - 2018.08.23

- Fixed: Typing specific numbers into InputNumber does not work correctly
- Fixed: Logo link in NavBar breaks
- Added: Merge Breadcrumb from B3 to Kotti

## 0.0.4 - 2018.08.21

- Added: this CHANGELOG file
- Added: Stepper styled InputNumber
- Added: Single Date Picker
- Added: link supported in NavBar logo
- Changed: inclued `kotti-style` in npm package
- Changed: heading icon location
- Fixed: drawer width can't change

## 0.0.3 - 2018.07.30

- Added: UserMenu supported
- Adedd: NavBar component
- Changed: NavBar style support narrow logo
- Changed: narrow bar toggle style changed

## 0.0.2 - 2018.07.26

- Fixed: better support for avatar
- Changed: switch to semantic version for production use

## 0.0.1-beta.10 - 2018.07.26

- Changed: out of beta

</details>
