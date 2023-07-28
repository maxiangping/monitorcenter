## 1、工程接口：

### 1.1、新增(无 id)、修改（有 id)

```
{
 "name":"project", // 工程表名
 "data":{
  "id": 111,
  "projectName":"隧道工程一", // 工程名称
  "lanesNumber": 4, // 车道数量
  "deviceList":[ // ip和端口列表
   {"ip":"192.168.1.1","port":5002},
   {"ip":"192.168.1.3","port":5002},
   {"ip":"192.168.1.10","port":5002}
  ]
 }
}
```

### 1.2、删除

```
{
 "name":"project", // 工程表名
 "data":{
  "id": 111,
 }
```

### 1.3、查询列表

```
{
 "name":"project", // 工程表名
}
```

## 2、登录接口：

### 2.1、登录验证(验证用户名和密码是否正确)

```
{
 "name":"user", // 用户表名
 "data":{
  "userName": "admin",
  "password": "123456",
 }
}
```

### 2.2、登录修改密码(验证原密码是否正确，修改新密码)

```
{
 "name":"user", // 用户表名
 "data":{
  "userName": "admin",
  "password": "123456",
  "newPassword": "654321",
 }
}
```

## 3、预案管理接口：

### 3.1、新增(无 id)、修改（有 id)

```
{
 "name":"preplan", // 预案表名
 "data":{
  "id": 111,
  "planName":"预案一", // 预案策略名称
  "trigger": "交通事故", // 触发条件 火灾系统报警 交通事故 紧急停车
  "createTime": "2023-01-01 02:01:03", // 创建时间
  "warningStatus": "紧急告警", // 告警状态 紧急告警 重要告警 一般告警
  "deviceList":[ // 联动设备场景列表
   {"id":"111","status":"q1"},
   {"id":"222","status":"q2"},
   {"id":"333","status":"隧道事故，缓慢通行"},
  ]
 }
}
```

### 3.2、删除

```
{
 "name":"preplan", // 预案表名
 "data":{
  "id": 111,
 }
```

### 3.3、查询列表

```
{
 "name":"preplan", // 预案表名
 "filter": {
   "planName":"预案一", // 预案策略名称
 }
}
```

## 4、事件、设备告警接口：

### 4.1、查询列表

```
// 入参
{
 "name":"alarm", // 告警表名
 "filter":{
  "name":"预案一", // 名称
  "trigger": "交通事故", // 触发条件 火灾系统报警 交通事故 紧急停车
  "warningStatus": "紧急告警", // 告警状态 紧急告警 重要告警 一般告警
  "projectId":"隧道工程一", // 工程id
 }
}
```

```
// 列表出参
【{
    id: '11',
    name: '策略1',
    addressName: 'dddd',
    warningInfo: '交通事故',
    warningTime: '2023-02-09 12:34:22',
    warningStatus: '紧急事故',
    dealType: '待处理',
    "type": 1,//告警类型 1事件告警 2设备告警
    "desc": "", // 处理描述
  },{
    id: '12',
    name: '策略2',
    addressName: 'dddd',
    warningInfo: '交通事故',
    warningTime: '2023-02-09 12:34:22',
    warningStatus: '紧急事故',
    dealType: '已处理',
    "type": 1,//告警类型 1事件告警 2设备告警
    "desc": "", // 处理描述
  }】
```

### 4.2、处理

```
// 入参
{
 "name":"alarm", // 告警表名
 "data":{
  "id": 111,
  "desc": "", // 处理描述
 }
}
```

### 4.3、消警

```
// 入参
{
 "name":"alarm", // 告警表名
 "data":{
  "id": 111,
 }
}
```

### 4.4、告警总数

```
// 入参
{
 "name":"alarm", // 告警表名
 "filter":{
  "projectId":"隧道工程一", // 工程id
 }
}
```

```
// 出参
{
  eventDeal: 111, // 事件告警处理总数
  eventNoDeal: 111,// 事件告警未处理总数
  equitDeal: 111,// 设备告警处理总数
  equitNoDeal: 111,// 设备未告警处理总数
}
```

## 5、实时监控接口：

### 5.1、查询列表

```
// 入参
{
 "name":"realtime", // 表名
}
```

```
// 列表出参
【
  {url: '',name: '摄像头1', type: 1}, // type类型  1左隧道 2右隧道
  {url: '',name: '摄像头2', type: 1}, // type类型  1左隧道 2右隧道
】
```

### 6、设备信息总数

```
// 入参
{
 "filter":{
  "projectId":"隧道工程一", // 工程id
 }
}
```

```
// 出参
{
  equitTotal: 111, // 设备总数
  equitFault: 111,// 设备故障
}
```
