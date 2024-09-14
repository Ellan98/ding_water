# Context

### 介绍

 golang context  是 golang 中的经典工具，主要在异步场景中用于实现  **`并发协调以及对 goroutine 的生命周期控制`** 除此之外，context 还兼有一定的 **`数据存储能力`**。

### context.Context

##### 核心数据结构

![contex.Context](C:\Users\admin\Desktop\golang\Advanced-进阶\image\context.Context.png)

##### 源码分析

```go
type Context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key any) any
}
```

- Context 是一种interface 类型 共有4种 核心 API
- Deadline() (time.Time,bool)  返回Ctx过期时间 即 何时迎来自己生命的终止
- Done() <- chan struct{} 返回用以标识ctx是否结束的chan
- Error() error  返回ctx的错误 （比如该context 被意外终止）
- Value(key any) any 返回ctx存放的对应于key的value（类似map结构）

### 标准error

##### 源码分析

```go
var Canceled = errors.New("context canceled")

var DeadlineExceeded error = deadlineExceededError{}

type deadlineExceededError struct{}

func (deadlineExceededError) Error() string   { return "context deadline exceeded" }
func (deadlineExceededError) Timeout() bool   { return true }
func (deadlineExceededError) Temporary() bool { return true}
```

- Canceled：context 被 cancel 时会报此错误；
- DeadlineExceeded：context 超时时会报此错误.

### emptyCtx

##### 源码分析

```go
type emptyCtx int

func (*emptyCtx) Deadline() (deadline time.Time, ok bool) {
    return
}

func (*emptyCtx) Done() <-chan struct{} {
    return nil
}

func (*emptyCtx) Err() error {
    return nil
}

func (*emptyCtx) Value(key any) any {
    return 
}
```

- emptyCtx 是一个空的 context，本质上类型为一个整型
- Deadline 方法会返回一个公元元年时间以及 false 的 flag，标识当前 context 不存在过期时间
-  Done 方法返回一个 nil 值，用户无论往 nil 中写入或者读取数据，均会陷入阻塞
-  Err 方法返回的错误永远为 nil
- Value 方法返回的 value 同样永远为 nil

### context.Background() 

##### 源码分析

```go
var (
    background = new(emptyCtx)
    todo       = new(emptyCtx)
)
func Background() Context {
    return background
}
```

### context.TODO()

##### 源码分析

```go
func TODO() Context {
    return todo
}
```

所常用的 context.Background() 和 context.TODO() 方法返回的均是 emptyCtx 类型的一个实例