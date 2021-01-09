# renovate-config-validator

Validate Renovate config in GitHub Actions

## Example

```yaml
name: CI

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Validate
        uses: rinchsan/renovate-config-validator@v0.0.0
        with:
          pattern: '*.json' # Regular expression for filename to validate, default to *.json
```
