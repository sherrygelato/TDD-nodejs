# TDD-nodejs

>>> 2/19 Nodejs 기반 TDD from edu.kosta.or.kr

---

### integration test error issue
```
Jest did not exit one second after the test run has completed.
This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```
- package.json
    - "test": "jest --runInBand --force-exit",