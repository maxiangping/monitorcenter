
export const IoSymbles = {
  1: '2显车道指示器',
  2: '4显车道指示器',
  3: '6显车道指示器',
  4: '单面左转指示器',
  5: '双面左转指示器',
  6: '横洞指示器',
  7: '3显信号灯',
  8: '4显信号灯',
  9: '射流风机',
  10: '排送风机',
  11: '照明',
  12: '水泵',
  13: '车通卷帘门',
  14: '人通卷帘门',
  // 15: '电动风阀',
  // 16: '破碎机',
  // 17: '双电源切换柜',
  // 18: '道闸',
  // 19: '超高检测',
  // 20: '浮球',
  // 21: '入侵报警',
  // 22: '消防电话联动',
}

export const OtherSymbles = {
  1: 'COVI',
  2: 'NO2',
  3: 'COVI/NO2',
  4: '风速风向',
  5: '洞内光强',
  6: '洞外光强',
  7: '甲烷',
  8: '氧气',
  9: '温度',
  10: '湿度',
  11: '温湿度',
  12: '车检器',
  13: '诱导灯',
  14: '液位仪',
  15: '压力表',
  16: '电力监控',
  17: '电流功率',
  18: '变频器',
}

export const getOtherSymbles = (t) => {
  return OtherSymbles[t]
}

export const AttrType =  {
  IoControl:1,
  RS485:2,
  Analog:3,
  Mixins:4,
  CustomProtocol:5,
}

export const attrOptions = [
  {
    label: '点位控制',
    value: 1,
  },
  {
    label: '485',
    value: 2,
  },
  {
    label: '模拟量',
    value: 3,
  },
  {
    label: '485+模拟量',
    value: 4,
  },
  // {
  //   label: '自定义协议',
  //   value: 5,
  // },
]

export const portOptions = [
  { value: 1, label: 'RS485 1' },
  { value: 2, label: 'RS485 2' },
  { value: 3, label: 'RS485 3' },
  { value: 4, label: 'RS485 4' },
  { value: 5, label: 'RS485 5' },
  { value: 6, label: 'RS485 6' },
  { value: 7, label: 'RS485 7' },
  { value: 8, label: 'RS485 8' },
]

export const ioOptions = [
  { value: 1, label: '2显车道指示器' },
  { value: 2, label: '4显车道指示器' },
  { value: 3, label: '6显车道指示器' },
  { value: 4, label: '单面左转指示器' },
  { value: 5, label: '双面左转指示器' },
  { value: 6, label: '横洞指示器' },
  { value: 7, label: '3显信号灯' },
  { value: 8, label: '4显信号灯' },
  { value: 9, label: '射流风机' },
  { value: 10, label: '排送风机' },
  { value: 11, label: '照明' },
  { value: 12, label: '水泵' },
  { value: 13, label: '车通卷帘门' },
  { value: 14, label: '人通卷帘门' },
  // { value: 15, label: '电动风阀' },
  // { value: 16, label: '破碎机' },
  // { value: 17, label: '双电源切换柜' },
  // { value: 18, label: '道闸' },
  // { value: 19, label: '超高检测' },
  // { value: 20, label: '浮球' },
  // { value: 21, label: '入侵报警' },
  // { value: 22, label: '消防电话联动' },
]

export const notIoOptions = [
  { value: 1, label: 'COVI' },
  { value: 2, label: 'NO2' },
  { value: 3, label: 'COVI/NO2' },
  { value: 4, label: '风速风向' },
  { value: 5, label: '洞内光强' },
  { value: 6, label: '洞外光强' },
  // { value: 7, label: '甲烷' },
  // { value: 8, label: '氧气' },
  // { value: 9, label: '温度' },
  // { value: 10, label: '湿度' },
  // { value: 11, label: '温湿度' },
  { value: 12, label: '车检器' },
  // { value: 13, label: '诱导灯' },
  // { value: 14, label: '液位仪' },
  // { value: 15, label: '压力表' },
  // { value: 16, label: '电力监控' },
  // { value: 17, label: '电流功率' },
  // { value: 18, label: '变频器' },
]

export const funcCodeOptions = [
  { value: 1, label: '(1)读线圈' },
  { value: 2, label: '(2)读离散输入' },
  { value: 3, label: '(3)读保持寄存器' },
  { value: 4, label: '(4)读输入寄存器' },
  { value: 5, label: '(5)写单线圈' },
  { value: 6, label: '(6)写单个寄存器' },
  { value: 15, label: '(15)写多个线圈' },
  { value: 16, label: '(16)写多个寄存器' },
]

export const varOptions = [
  { value: 1, label: 'CO值' },
  { value: 2, label: 'VI值' },
  { value: 3, label: '风速值' },
  { value: 4, label: '风向值' },
  { value: 5, label: '光强值' },
  { value: 6, label: 'NO2值' },
  { value: 7, label: '变量1' },
  { value: 8, label: '变量2' },
  { value: 9, label: '变量3' },
  { value: 10, label: '变量4' },
  { value: 11, label: '变量5' },
  { value: 12, label: '变量6' },
  { value: 13, label: '变量7' },
  { value: 14, label: '变量8' },

  { value: 5000, label: 'CO告警值' },
  { value: 5001, label: 'VI告警值' },
  { value: 5002, label: '风速告警值' },
  { value: 5003, label: '风向告警值' },
  { value: 5004, label: '光强告警值' },
  { value: 5005, label: 'NO2告警值' },

  { value: 10000, label: 'CO值' },
  { value: 10001, label: 'VI值' },
  { value: 10002, label: '风速值' },
  { value: 10003, label: '风向值' },
  { value: 10004, label: '光强值' },
  { value: 10005, label: 'NO2值' },
  { value: 10006, label: '变量1' },
  { value: 10007, label: '变量2' },
  { value: 10008, label: '变量3' },
  { value: 10009, label: '变量4' },
  { value: 10010, label: '变量5' },
  { value: 10011, label: '变量6' },
  { value: 10012, label: '变量7' },
  { value: 10013, label: '变量8' },

  { value: 15000, label: 'CO告警值' },
  { value: 15001, label: 'VI告警值' },
  { value: 15002, label: '风速告警值' },
  { value: 15003, label: '风向告警值' },
  { value: 15004, label: '光强告警值' },
  { value: 15005, label: 'NO2告警值' },
]

export const addrVarOptions = [...varOptions.filter((item) => item.value < 10000)]
export const anaVarOptions = [...varOptions.filter((item) => item.value > 10000)]

export const strToUint16 = (str) => {
  const encoder = new TextEncoder()
  const buffer = encoder.encode(str)
  const u16Array = new Uint16Array(buffer.buffer)
  return u16Array
}

const EOL = 3338
export const serialToUint16 = (scenes) => {
  const result = []

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]
    const { symble, attr, coord } = scene

    const xy = strToUint16(coord)
    const a = new Uint16Array([((i + 1) << 8) | symble])
    if (attr === AttrType.IoControl) {
      if (symble === 1) {
        const b = new Uint16Array([(1 << 8) | 6])
        const v = scene
        result.push(...a, ...b, ...xy, v.q1 || 512, v.q2 || 512, v.i1 || 0 || 0, v.i2 || 0 || 0, EOL)
      } else if (symble === 2) {
        const b = new Uint16Array([(1 << 8) | 10])
        const v = scene 
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.q3 || 512,
          v.q4 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          EOL,
        )
      } else if (symble === 3) {
        const b = new Uint16Array([(1 << 8) | 14])
        const v = scene
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.q3 || 512,
          v.q4 || 512,
          v.q5 || 512,
          v.q6 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          v.i5 || 0,
          v.i6 || 0,
          EOL,
        )
      } else if (symble === 4) {
        const b = new Uint16Array([(1 << 8) | 4])
        const v = scene
        result.push(...a, ...b, ...xy, v.q1 || 512, v.i1 || 0, EOL)
      } else if (symble === 5) {
        const b = new Uint16Array([(1 << 8) | 14])
        const v = scene
        result.push(...a, ...b, ...xy, v.q1 || 512, v.q2 || 512, v.i1 || 0, v.i2 || 0, EOL)
      } else if (symble === 6) {
        const b = new Uint16Array([(1 << 8) | 6])
        const v = scene
        result.push(...a, ...b, ...xy, v.q1 || 512, v.q2 || 512, v.i1 || 0, v.i2 || 0, EOL)
      } else if (symble === 7) {
        const b = new Uint16Array([(1 << 8) | 8])
        const v = scene
        result.push(...a, ...b, ...xy, v.q1 || 512, v.q2 || 512, v.q3 || 512, v.i1 || 0, v.i2 || 0, v.i3 || 0, EOL)
      } else if (symble === 8) {
        const b = new Uint16Array([(1 << 8) | 10])
        const v = scene
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.q3 || 512,
          v.q4 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          EOL,
        )
      } else if (symble === 9) {
        const b = new Uint16Array([(1 << 8) | 13])
        const v = scene
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.q3 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          v.i5 || 0,
          v.i6 || 0,
          v.i7 || 0,
          v.delay,
          EOL,
        )
      } else if (symble === 10) {
        const b = new Uint16Array([(1 << 8) | 10])
        const v = scene
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          v.i5 || 0,
          v.delay,
          EOL,
        )
      } else if (symble === 11) {
        const b = new Uint16Array([(1 << 8) | 8])
        const v = scene
        result.push(...a, ...b, ...xy, v.q1 || 512, v.q2 || 512, v.i1 || 0, v.i2 || 0, v.i3 || 0, v.i4 || 0, EOL)
      } else if (symble === 12) {
        const b = new Uint16Array([(1 << 8) | 13])
        const v = scene
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          v.i5 || 0,
          v.i6 || 0,
          v.i7 || 0,
          v.i8 || 0,
          v.i9 || 0,
          EOL,
        )
      } else if (symble === 13) {
        const b = new Uint16Array([(1 << 8) | 9])
        const v = scene
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.q3 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          EOL,
        )
      } else if (symble === 14) {
        const b = new Uint16Array([(1 << 8) | 9])
        const v = scene 
        result.push(
          ...a,
          ...b,
          ...xy,
          v.q1 || 512,
          v.q2 || 512,
          v.q3 || 512,
          v.i1 || 0,
          v.i2 || 0,
          v.i3 || 0,
          v.i4 || 0,
          EOL,
        )
      }
    }

    if (attr === AttrType.RS485) {
      const v = scene 
      const port_and_fncode = (v.fn_code << 3) | v.port
      const p = new Uint16Array([(port_and_fncode << 8) | v.slave_id])
      const vars = v.addr_vars.flatMap((item) => [item.code, item.addr])
      const b = new Uint16Array([(2 << 8) | (4 + vars.length)])
      result.push(...a, ...b, ...xy, ...p, v.master_addr, ...vars, EOL)
    }

    if (attr === AttrType.Analog) {
      const v = scene 
      const vars = v.ang_vars.flatMap((item) => [item.code, item.a])
      const b = new Uint16Array([(3 << 8) | (2 + vars.length)])
      result.push(...a, ...b, ...xy, ...vars, EOL)
    }

    if (attr === AttrType.Mixins) {
      const v = scene 
      const port_and_fncode = (v.fn_code << 3) | v.port
      const p = new Uint16Array([(port_and_fncode << 8) | v.slave_id])
      const vars = v.addr_vars.flatMap((item) => [item.code, item.addr])
      const ang_vars = v.ang_vars.flatMap((item) => [item.code, item.a])
      const b = new Uint16Array([(4 << 8) | (4 + vars.length + ang_vars.length)])
      result.push(...a, ...b, ...xy, ...p, v.master_addr, ...vars, ...ang_vars, EOL)
    }
  }

  return result
}

export const serialToDrivsUint16 = (scenes) => {
  const result = []

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]
    const { attr } = scene

    if (attr === AttrType.RS485) {
      const v = scene 

      for (let i = 0; i < v.addr_vars.length; i++) {
        const item = v.addr_vars[i]
        result.push(v.port, v.fn_code, v.slave_id, item.addr, 1, v.master_addr + i, EOL)
      }
    }

    if (attr === AttrType.Mixins) {
      const v = scene 
      for (let i = 0; i < v.addr_vars.length; i++) {
        const item = v.addr_vars[i]
        result.push(v.port, v.fn_code, v.slave_id, item.addr, 1, v.master_addr + i, EOL)
      }
    }
  }

  return result
}

const splitData = (data) => {
  const result = []

  let temp = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item === EOL) {
      if (temp.length !== 0) {
        result.push(temp)
      }
      temp = []
      continue
    }
    temp.push(item)
  }
  return result
}

export const uint16ToString = (data) => {
  const u16Array = new Uint16Array([...data])
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(u16Array)
}

export const deSerialToScene = (data) => {
  const result = []

  const scenes = splitData(data)
  console.log(scenes)
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]

    if (scene.length < 2) {
      break
    }

    const first = scene[0]
    const sec = scene[1]

    const index = (first >> 8) & 0xff
    const symble = first & 0xff
    const attr = (sec >> 8) & 0xff
    const len = sec & 0xff

    if (
      attr !== AttrType.IoControl &&
      attr !== AttrType.RS485 &&
      attr !== AttrType.Analog &&
      attr !== AttrType.Mixins
    ) {
      break
    }

    const data = scene.slice(2)
    console.log(len)
    if (data.length !== len) {
      break
    }
    const coord = uint16ToString(data.slice(0, 2))
    if (attr === AttrType.IoControl) {
      if (symble === 1) {
        const q1 = data[2]
        const q2 = data[3]
        const i1 = data[4]
        const i2 = data[5]
        result.push({ index, symble, attr, coord, q1, q2, i1, i2 })
      } else if (symble === 2) {
        const q1 = data[2]
        const q2 = data[3]
        const q3 = data[4]
        const q4 = data[5]
        const i1 = data[6]
        const i2 = data[7]
        const i3 = data[8]
        const i4 = data[9]
        result.push({ index, symble, attr, coord, q1, q2, q3, q4, i1, i2, i3, i4 } )
      } else if (symble === 3) {
        const q1 = data[2]
        const q2 = data[3]
        const q3 = data[4]
        const q4 = data[5]
        const q5 = data[6]
        const q6 = data[7]
        const i1 = data[8]
        const i2 = data[9]
        const i3 = data[10]
        const i4 = data[11]
        const i5 = data[12]
        const i6 = data[13]
        result.push({ index, symble, attr, coord, q1, q2, q3, q4, q5, q6, i1, i2, i3, i4, i5, i6 })
      } else if (symble === 4) {
        const q1 = data[2]
        const i1 = data[3]

        result.push({ index, symble, attr, coord, q1, i1 })
      } else if (symble === 5) {
        const q1 = data[2]
        const q2 = data[3]
        const i1 = data[4]
        const i2 = data[5]
        result.push({ index, symble, attr, coord, q1, q2, i1, i2 })
      } else if (symble === 6) {
        const q1 = data[2]
        const q2 = data[3]
        const i1 = data[4]
        const i2 = data[5]
        result.push({ index, symble, attr, coord, q1, q2, i1, i2 })
      } else if (symble === 7) {
        const q1 = data[2]
        const q2 = data[3]
        const q3 = data[4]
        const i1 = data[5]
        const i2 = data[6]
        const i3 = data[7]
        result.push({ index, symble, attr, coord, q1, q2, q3, i1, i2, i3 })
      } else if (symble === 8) {
        const q1 = data[2]
        const q2 = data[3]
        const q3 = data[4]
        const q4 = data[5]
        const i1 = data[6]
        const i2 = data[7]
        const i3 = data[8]
        const i4 = data[9]
        result.push({ index, symble, attr, coord, q1, q2, q3, q4, i1, i2, i3, i4 })
      } else if (symble === 9) {
        const q1 = data[2]
        const q2 = data[3]
        const q3 = data[4]
        const i1 = data[5]
        const i2 = data[6]
        const i3 = data[7]
        const i4 = data[8]
        const i5 = data[9]
        const i6 = data[10]
        const i7 = data[11]
        const delay = data[12]
        result.push({ index, symble, attr, coord, q1, q2, q3, i1, i2, i3, i4, i5, i6, i7, delay })
      } else if (symble === 10) {
        const q1 = data[2]
        const q2 = data[3]
        const i1 = data[4]
        const i2 = data[5]
        const i3 = data[6]
        const i4 = data[7]
        const i5 = data[8]
        const delay = data[9]
        result.push({ index, symble, attr, coord, q1, q2, i1, i2, i3, i4, i5, delay })
      } else if (symble === 11) {
        const q1 = data[2]
        const q2 = data[3]
        const i1 = data[4]
        const i2 = data[5]
        const i3 = data[6]
        const i4 = data[7]
        result.push({ index, symble, attr, coord, q1, q2, i1, i2, i3, i4 })
      } else if (symble === 12) {
        const q1 = data[2]
        const q2 = data[3]
        const i1 = data[4]
        const i2 = data[5]
        const i3 = data[6]
        const i4 = data[7]
        const i5 = data[8]
        const i6 = data[9]
        const i7 = data[10]
        const i8 = data[11]
        const i9 = data[12]
        result.push({ index, symble, attr, coord, q1, q2, i1, i2, i3, i4, i5, i6, i7, i8, i9 })
      } else if (symble === 13) {
        const q1 = data[2]
        const q2 = data[3]
        const q3 = data[4]
        const i1 = data[5]
        const i2 = data[6]
        const i3 = data[7]
        const i4 = data[8]
        result.push({ index, symble, attr, coord, q1, q2, q3, i1, i2, i3, i4 })
      } else if (symble === 14) {
        const q1 = data[2]
        const q2 = data[3]
        const q3 = data[4]
        const i1 = data[5]
        const i2 = data[6]
        const i3 = data[7]
        const i4 = data[8]
        result.push({ index, symble, attr, coord, q1, q2, q3, i1, i2, i3, i4 } )
      }
    }

    if (attr === AttrType.RS485) {
      const port = (data[2] >> 8) & 0xff & 0x07
      const fn_code = (((data[2] >> 8) & 0xff) >> 3) & 0x1f
      const slave_id = data[2] & 0xff
      const master_addr = data[3]

      const addr_vars = splitArrayByLength(data.slice(4, data.length), 2)
        .filter((item) => item[0] < 10000)
        .map((item) => {
          const code = item[0]
          const addr = item[1]
          return { code, addr } 
        })
      result.push({ index, symble, attr, coord, port, fn_code, slave_id, master_addr, addr_vars } )
    }

    if (attr === AttrType.Analog) {
      const ang_vars = splitArrayByLength(data.slice(2, data.length), 2)
        .filter((item) => item[0] >= 10000)
        .map((item) => {
          const code = item[0]
          const a = item[1]
          return { code, a } 
        })
      result.push({ index, symble, attr, coord, ang_vars } )
    }

    if (attr === AttrType.Mixins) {
      const port = (data[2] >> 8) & 0xff & 0x07
      const fn_code = (((data[2] >> 8) & 0xff) >> 3) & 0x1f
      const slave_id = data[2] & 0xff
      const master_addr = data[3]

      const addr_vars = splitArrayByLength(data.slice(4, data.length), 2)
        .filter((item) => item[0] < 10000)
        .map((item) => {
          const code = item[0]
          const addr = item[1]
          return { code, addr } 
        })

      const ang_vars = splitArrayByLength(data.slice(4, data.length), 2)
        .filter((item) => item[0] >= 10000)
        .map((item) => {
          const code = item[0]
          const a = item[1]
          return { code, a } 
        })

      result.push({ index, symble, attr, coord, port, fn_code, slave_id, master_addr, addr_vars, ang_vars } )
    }
  }

  return result
}

function splitArrayByLength(arr, len) {
  const result = []
  for (let i = 0; i < arr.length; i += len) {
    result.push(arr.slice(i, i + len))
  }
  return result
}
