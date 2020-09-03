# DOCUMENT CONTROL APP

### Features:
- edit document backend
- edit document authentication
- delete document (only allow if it belongs to user)
- user directory
- user profile
- refactor MainFrame component
- suspense (optional)

### Compromises:
- editing documents will cause isDone, isApproved to reset. Cumbersome to track those attributes when you're setting requiredInput and requiredApprovals

### Ref:
- [Jonathan Levaillant](https://codepen.io/jlwebart) for the elegant  radio button
