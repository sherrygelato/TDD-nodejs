# # TDD-nodejs

> 2/19 Nodejs 기반 TDD from edu.kosta.or.kr

- nodejs를 기반으로 하는 프로젝트에서 활용하고자 학습을 진행하였습니다.
- 시간은 조금 더 걸릴지는 몰라도, 프로젝트 완성도에 있어서는 성과가 있을 것이라 생각합니다.
- 이를 활용한 프로젝트는 [이것]()입니다.

---

### ### integration test error issue
```
Jest did not exit one second after the test run has completed.
This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```
- package.json
    - "test": "jest --runInBand --force-exit",
