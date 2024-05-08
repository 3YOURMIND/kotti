# Fake Root

This package exists in order to lint the repo root with the same turborepo workflows we can use for ordinary packages.

See https://turbo.build/messages/missing-root-task-in-turbo-json for context as to why this causes an infinite loop without this “root” package.
