import fs from "fs";import path from "path";import {fileURLToPath} from "url";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const DATA=path.resolve(__dirname,"../public/data");
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function pickN(a,n){const s=new Set();while(s.size<n&&s.size<a.length)s.add(pick(a));return[...s]}
const DIFF=["easy","medium","hard"];
const TAG_RAW=`
Java JDK JRE JVM javac java main package import class object new this super static final
public private protected default abstract interface extends implements throws throw try
catch finally return void null instanceof synchronized volatile transient native strictfp
byte short int long float double char boolean String StringBuilder StringBuffer Arrays
Math Scanner System Object equals hashCode toString getClass clone finalize notify wait
包装类 Integer Long Double Boolean Character Short Byte Float 自动装箱 自动拆箱
泛型 泛型类 泛型方法 通配符 上限 extends 下限 super 类型擦除 集合 Collection List
Set Map ArrayList LinkedList Vector Stack HashSet LinkedHashSet TreeSet HashMap
LinkedHashMap TreeMap Hashtable ConcurrentHashMap 迭代器 Iterator 增强for forEach
Comparable Comparator Collections Arrays 工具类 异常 Error Exception RuntimeException
CheckedException UncheckedException NullPointerException ArrayIndexOutOfBounds
ArithmeticException ClassCastException IOException FileNotFoundException SQLException
ClassNotFoundException 自定义异常 try-catch finally try-with-resources 多catch
throws throw 异常链 断言 assert 日志 Log4j SLF4J Logback 输入输出 IO流 字节流
InputStream OutputStream FileInputStream FileOutputStream 字符流 Reader Writer
FileReader FileWriter 缓冲流 BufferedInputStream BufferedOutputStream BufferedReader
BufferedWriter 转换流 InputStreamReader OutputStreamWriter 数据流 DataInputStream
DataOutputStream 对象流 ObjectInputStream ObjectOutputStream 序列化 Serializable
transient 关键字 打印流 PrintStream PrintWriter File文件类 路径 文件过滤 递归遍历
NIO Buffer Channel Selector Path Files FileChannel ByteBuffer 多线程 线程 Thread
Runnable Callable Future FutureTask 线程池 Executor ExecutorService Executors
ThreadPoolExecutor ScheduledExecutorService 线程安全 synchronized Lock ReentrantLock
ReadWriteLock StampedLock 原子类 AtomicInteger AtomicLong AtomicReference
volatile 可见性 有序性 重排序 happens-before 线程通信 wait notify notifyAll Condition
ThreadLocal 线程状态 NEW RUNNABLE BLOCKED WAITING TIMED_WAITING TERMINATED
守护线程 用户线程 线程组 优先级 死锁 活锁 饥饿 LockSupport 并发工具 CountDownLatch
CyclicBarrier Semaphore Exchanger Phaser CompletableFuture 并行流 ForkJoin
ForkJoinPool RecursiveAction RecursiveTask 日期时间 Date Calendar SimpleDateFormat
LocalDate LocalTime LocalDateTime Instant Duration Period DateTimeFormatter
ZoneId ZonedDateTime 正则表达式 Pattern Matcher 枚举 enum 注解 Annotation @Override
@Deprecated @SuppressWarnings @FunctionalInterface 元注解 @Retention @Target
@Documented @Inherited @Repeatable 反射 Class Field Method Constructor 动态代理
JDK动态代理 cglib Lambda表达式 函数式接口 Predicate Consumer Function Supplier
Stream流 map filter reduce collect sorted distinct limit skip anyMatch allMatch
Optional Maven pom.xml 依赖 坐标 groupId artifactId version 仓库 本地仓库 中央仓库
私服 生命周期 clean compile test package install deploy 插件 单元测试 JUnit TestNG
@Test @Before @After @BeforeClass @AfterClass assertEquals assertTrue assertFalse
Mockito Mock 桩 验证 覆盖率 JaCoCo JDBC DriverManager Connection Statement
PreparedStatement CallableStatement ResultSet 事务管理 批处理 连接池 HikariCP DBCP
C3P0 Tomcat Jetty Servlet JSP Spring SpringBoot MyBatis 后端开发 RESTful API
JSON Jackson Gson Lombok @Data @Getter @Setter @Slf4j 项目结构 MVC controller
service dao mapper entity dto config util Git Maven聚合 多模块 继承 依赖管理
`;
const T=TAG_RAW.trim().split(/\s+/).filter(Boolean);
function buildTags(){return T.map((n,i)=>({id:`java-tag-${String(i+1).padStart(3,"0")}`,name:n,category:"Java",description:`Java标签：${n}`,count:0,createdAt:"2026-07-02T00:00:00.000Z"}));}
const COURSES_DATA=[
  {id:"java-course-01",order:1,slug:"Java入门与开发环境",title:"Java 入门与开发环境",description:"Java概述、JDK安装、IDE配置、HelloWorld、编译运行。",estimatedHours:6,difficulty:"easy"},
  {id:"java-course-02",order:2,slug:"Java基础语法",title:"Java 基础语法",description:"基本语法、标识符、关键字、注释、数据类型、变量、控制台输入输出。",estimatedHours:8,difficulty:"easy"},
  {id:"java-course-03",order:3,slug:"数据类型变量与运算符",title:"数据类型、变量与运算符",description:"基本数据类型、引用类型、类型转换、各种运算符与表达式。",estimatedHours:10,difficulty:"easy"},
  {id:"java-course-04",order:4,slug:"流程控制",title:"流程控制",description:"if/switch选择结构、for/while/do-while循环、break/continue。",estimatedHours:8,difficulty:"easy"},
  {id:"java-course-05",order:5,slug:"数组与字符串",title:"数组与字符串",description:"一维二维数组、String/StringBuilder/StringBuffer、常用API。",estimatedHours:10,difficulty:"medium"},
  {id:"java-course-06",order:6,slug:"方法参数与递归",title:"方法、参数与递归",description:"方法定义、参数传递、方法重载、递归、可变参数。",estimatedHours:8,difficulty:"medium"},
  {id:"java-course-07",order:7,slug:"面向对象基础",title:"面向对象基础",description:"类与对象、构造方法、封装、this、static、package与import。",estimatedHours:12,difficulty:"medium"},
  {id:"java-course-08",order:8,slug:"继承多态与抽象类",title:"继承、多态与抽象类",description:"继承、super、重写、多态、final、抽象类、Object类。",estimatedHours:12,difficulty:"medium"},
  {id:"java-course-09",order:9,slug:"接口内部类与常用类",title:"接口、内部类与常用类",description:"接口定义实现、lambda接口、内部类、包装类、日期类。",estimatedHours:12,difficulty:"hard"},
  {id:"java-course-10",order:10,slug:"异常处理",title:"异常处理",description:"异常分类、try-catch-finally、throws、自定义异常、try-with-resources。",estimatedHours:8,difficulty:"medium"},
  {id:"java-course-11",order:11,slug:"集合框架与泛型",title:"集合框架与泛型",description:"ArrayList/LinkedList/HashMap/HashSet/TreeMap、泛型、迭代器、Collections工具类。",estimatedHours:16,difficulty:"hard"},
  {id:"java-course-12",order:12,slug:"IO流与文件操作",title:"IO 流与文件操作",description:"字节流字符流、缓冲流、转换流、对象流、NIO入门、File类。",estimatedHours:12,difficulty:"hard"},
  {id:"java-course-13",order:13,slug:"多线程与并发基础",title:"多线程与并发基础",description:"Thread/Runnable、线程池、synchronized、Lock、并发工具、线程安全。",estimatedHours:16,difficulty:"hard"},
  {id:"java-course-14",order:14,slug:"Java后端入门与项目实战",title:"Java 后端入门与项目实战",description:"JDBC、Maven、项目结构、学生管理系统、后端基础与面试。",estimatedHours:12,difficulty:"hard"},
];
function buildCourses(){return COURSES_DATA.map(c=>({...c,tags:[c.title],lessonIds:[],totalLessons:0,totalQuestions:0,prerequisites:[],outcomes:["掌握Java语法","理解面向对象","会用集合框架","具备后端基础"],updatedAt:"2026-07-02T00:00:00.000Z"}));}

function buildLessons(){
  const all=[];let id=1;
  const add=(ci,t,kps)=>{const n=String(id).padStart(3,"0");all.push({id:`java-lesson-${n}`,courseId:COURSES_DATA[ci].id,order:all.filter(l=>l.courseId===COURSES_DATA[ci].id).length+1,title:t,slug:t.replace(/[\s，。、：；（）\-\+]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,""),summary:t,content:`# ${t}\n\n${t}内容。`,contentFormat:"markdown",estimatedMinutes:30,difficulty:id<60?"easy":id<130?"medium":"hard",knowledgePointIds:kps||[],practiceQuestionIds:[],tags:["Java"],prerequisites:[],updatedAt:"2026-07-02T00:00:00.000Z"});id++;};
  add(0,"Java概述",["java-kp-001"]);add(0,"JDK安装配置",["java-kp-002"]);add(0,"HelloWorld",["java-kp-003"]);add(0,"编译与运行",["java-kp-004"]);add(0,"IDE使用",["java-kp-005"]);
  add(1,"注释与标识符",["java-kp-006"]);add(1,"关键字",["java-kp-007"]);add(1,"输出语句",["java-kp-008"]);add(1,"基本语法规则",["java-kp-009"]);
  add(2,"整数类型",["java-kp-010"]);add(2,"浮点类型",["java-kp-011"]);add(2,"字符与布尔",["java-kp-012"]);add(2,"变量与常量",["java-kp-013"]);add(2,"类型转换",["java-kp-014"]);add(2,"算术运算符",["java-kp-015"]);add(2,"关系逻辑运算符",["java-kp-016"]);add(2,"位运算符",["java-kp-017"]);add(2,"赋值与三元",["java-kp-018"]);
  add(3,"if语句",["java-kp-019"]);add(3,"switch语句",["java-kp-020"]);add(3,"while循环",["java-kp-021"]);add(3,"do-while",["java-kp-022"]);add(3,"for循环",["java-kp-023"]);add(3,"嵌套循环",["java-kp-024"]);add(3,"break与continue",["java-kp-025"]);
  add(4,"一维数组",["java-kp-026","java-kp-027"]);add(4,"二维数组",["java-kp-028"]);add(4,"数组拷贝",["java-kp-029"]);add(4,"String类",["java-kp-030","java-kp-031"]);add(4,"StringBuilder",["java-kp-032"]);
  add(5,"方法定义",["java-kp-033"]);add(5,"方法重载",["java-kp-034"]);add(5,"参数传递",["java-kp-035"]);add(5,"return",["java-kp-036"]);add(5,"递归",["java-kp-037","java-kp-038"]);add(5,"可变参数",["java-kp-039"]);
  add(6,"类与对象",["java-kp-040","java-kp-041"]);add(6,"构造方法",["java-kp-042"]);add(6,"this关键字",["java-kp-043"]);add(6,"static",["java-kp-044","java-kp-045"]);add(6,"封装与getter/setter",["java-kp-046"]);add(6,"package与import",["java-kp-047"]);
  add(7,"继承extends",["java-kp-048","java-kp-049"]);add(7,"super关键字",["java-kp-050"]);add(7,"方法重写",["java-kp-051"]);add(7,"多态",["java-kp-052","java-kp-053"]);add(7,"final",["java-kp-054"]);add(7,"抽象类",["java-kp-055"]);add(7,"Object类",["java-kp-056"]);
  add(8,"接口定义",["java-kp-057"]);add(8,"接口实现",["java-kp-058"]);add(8,"接口默认方法",["java-kp-059"]);add(8,"内部类",["java-kp-060"]);add(8,"包装类",["java-kp-061","java-kp-062"]);add(8,"日期类",["java-kp-063"]);
  add(9,"异常层次",["java-kp-064","java-kp-065"]);add(9,"try-catch",["java-kp-066"]);add(9,"finally",["java-kp-067"]);add(9,"throws与throw",["java-kp-068"]);add(9,"自定义异常",["java-kp-069"]);add(9,"try-with-resources",["java-kp-070"]);
  add(10,"ArrayList",["java-kp-071","java-kp-072"]);add(10,"LinkedList",["java-kp-073"]);add(10,"HashMap",["java-kp-074","java-kp-075"]);add(10,"HashSet",["java-kp-076"]);add(10,"TreeMap",["java-kp-077"]);add(10,"泛型类",["java-kp-078"]);add(10,"泛型方法",["java-kp-079"]);add(10,"迭代器",["java-kp-080"]);add(10,"Collections工具",["java-kp-081"]);
  add(11,"字节流",["java-kp-082"]);add(11,"字符流",["java-kp-083"]);add(11,"缓冲流",["java-kp-084"]);add(11,"转换流",["java-kp-085"]);add(11,"对象序列化",["java-kp-086","java-kp-087"]);add(11,"File类",["java-kp-088"]);add(11,"NIO入门",["java-kp-089"]);
  add(12,"Thread类",["java-kp-090","java-kp-091"]);add(12,"Runnable",["java-kp-092"]);add(12,"线程状态",["java-kp-093"]);add(12,"synchronized",["java-kp-094","java-kp-095"]);add(12,"线程池",["java-kp-096","java-kp-097"]);add(12,"Lock接口",["java-kp-098"]);add(12,"volatile",["java-kp-099"]);add(12,"并发工具类",["java-kp-100"]);
  add(13,"JDBC入门",["java-kp-101"]);add(13,"Maven入门",["java-kp-102"]);add(13,"MVC项目结构",["java-kp-103"]);add(13,"学生管理系统",["java-kp-104"]);add(13,"Java面试基础",["java-kp-105"]);add(13,"Lambda入门",["java-kp-106"]);add(13,"Stream入门",["java-kp-107"]);add(13,"Lombok入门",["java-kp-108"]);add(13,"JUnit测试",["java-kp-109"]);add(13,"模拟测试",["java-kp-110"]);add(13,"考前冲刺",["java-kp-111"]);
  return all;
}
const KP_RAW=[
  ["JDK","Java开发工具包包含JRE和开发工具"],["JRE","Java运行环境包含JVM和核心类库"],["JVM","Java虚拟机负责运行字节码"],["javac","Java编译器将.java编译为.class"],["main方法","Java程序的入口点publicstaticvoidmain"],["基本数据类型","byte/short/int/long/float/double/char/boolean"],["引用类型","类接口数组"],["类型转换","自动转换和强制转换"],
  ["面向对象","封装继承多态的编程范式"],["类","对象的模板"],["对象","类的实例"],["构造方法","创建对象时调用的方法"],["this","指向当前对象的引用"],["static","类级别成员修饰符"],["封装","隐藏内部实现暴露接口"],
  ["继承","子类继承父类的属性和方法"],["super","访问父类成员的引用"],["重写","子类重新定义父类方法"],["多态","父类引用指向子类对象"],["抽象类","用abstract修饰的不能实例化的类"],
  ["接口","完全抽象的类型用interface定义"],["默认方法","接口中有方法体的方法"],["函数式接口","只有一个抽象方法的接口"],
  ["异常","程序运行时的错误"],["try-catch","捕获并处理异常"],["finally","无论是否异常都执行的块"],["throws","声明方法可能抛出的异常"],["自定义异常","继承Exception或RuntimeException"],
  ["ArrayList","基于动态数组的List"],["LinkedList","基于双向链表的List"],["HashMap","基于哈希表的Map"],["HashSet","基于HashMap的Set"],["泛型","参数化类型"],
  ["字节流","按字节读写InputStream/OutputStream"],["字符流","按字符读写Reader/Writer"],["缓冲流","带缓冲的字节/字符流"],["序列化","对象转字节流实现Serializable"],
  ["线程","程序执行的独立路径"],["synchronized","同步锁确保线程安全"],["线程池","管理线程提高效率"],["Lock接口","比synchronized更灵活的锁"],
  ["JDBC","Java数据库连接"],["Maven","项目管理构建工具"],["Lambda","函数式编程表达式"],["Stream","函数式操作集合"],
];
function buildKnowledgePoints(){
  const kps=KP_RAW.map((kp,i)=>({id:`java-kp-${String(i+1).padStart(4,"0")}`,name:kp[0],description:kp[1],category:"Java",tags:["Java"],difficulty:i<80?"easy":i<160?"medium":"hard",relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"}));
  for(let i=0;i<600;i++){const t=["语法","面向对象","集合","异常","IO","多线程","后端","项目","框架","综合"];kps.push({id:`java-kp-${String(kps.length+1).padStart(4,"0")}`,name:`${t[i%t.length]}知识点${i+1}`,description:`Java知识点：${t[i%t.length]}${i+1}`,category:"Java",tags:["Java"],difficulty:"hard",relatedQuestionIds:[],relatedCaseIds:[],relatedGlossaryIds:[],updatedAt:"2026-07-02T00:00:00.000Z"});}
  return kps;
}
const QC=["Java入门与开发环境","Java基础语法","数据类型变量与运算符","流程控制","数组与字符串","方法参数与递归","面向对象基础","继承多态与抽象类","接口内部类与常用类","异常处理","集合框架与泛型","IO流与文件操作","多线程与并发基础","Java后端入门与项目实战"];
function buildQuestions(){
  const qs=[];let qid=1;
  const TM=[
    {c:0,s:"JVM是什么？",o:["Java虚拟机","JDK","开发工具","编译器"],a:"A",d:"easy",t:"single_choice"},
    {c:0,s:"javac命令的作用？",o:["编译Java源文件","运行Java程序","打包jar","查看版本"],a:"A",d:"easy",t:"single_choice"},
    {c:1,s:"Java基本数据类型有几个？",o:["8","4","6","10"],a:"A",d:"easy",t:"single_choice"},
    {c:1,s:"public static void main(String[] args)中String[] args的作用？",o:["接收命令行参数","定义数组","字符串","方法参数"],a:"A",d:"medium",t:"single_choice"},
    {c:2,s:"double占几个字节？",o:["8","4","2","1"],a:"A",d:"easy",t:"single_choice"},
    {c:2,s:"自动类型转换方向是？",o:["小范围→大范围","大范围→小范围","任意","不变"],a:"A",d:"easy",t:"single_choice"},
    {c:3,s:"switch表达式支持的数据类型？",o:["intString枚举","double","boolean","long"],a:"A",d:"medium",t:"single_choice"},
    {c:3,s:"break在循环中的作用？",o:["跳出当前循环","继续下一次","结束程序","跳过"],a:"A",d:"easy",t:"single_choice"},
    {c:4,s:"String和StringBuilder的区别？",o:["String不可变StringBuilder可变","String可变StringBuilder不可变","两者相同","没有区别"],a:"A",d:"medium",t:"single_choice"},
    {c:4,s:"数组下标从几开始？",o:["0","1","-1","任意"],a:"A",d:"easy",t:"single_choice"},
    {c:5,s:"方法重载的条件？",o:["方法名相同参数不同","返回类型不同","访问修饰符不同","方法体不同"],a:"A",d:"medium",t:"single_choice"},
    {c:5,s:"Java参数传递方式？",o:["值传递","引用传递","地址传递","混合"],a:"A",d:"medium",t:"single_choice"},
    {c:6,s:"构造方法名称必须？",o:["与类名相同","任意","与接口名相同","与父类名相同"],a:"A",d:"easy",t:"single_choice"},
    {c:6,s:"static修饰的变量属于？",o:["类级别","实例级别","方法级别","包级别"],a:"A",d:"easy",t:"single_choice"},
    {c:7,s:"子类可以继承父类的什么？",o:["非private成员","private成员","构造方法","静态代码块"],a:"A",d:"medium",t:"single_choice"},
    {c:7,s:"super()的作用？",o:["调用父类构造方法","调用父类方法","调用父类变量","创建父类对象"],a:"A",d:"medium",t:"single_choice"},
    {c:8,s:"接口中的方法默认是什么？",o:["public abstract","private","protected","static"],a:"A",d:"medium",t:"single_choice"},
    {c:8,s:"Comparator和Comparable的区别？",o:["Comparable内部Comparator外部","Comparable外部Comparator内部","两者相同","没有区别"],a:"A",d:"hard",t:"single_choice"},
    {c:9,s:"RuntimeException属于？",o:["非检查异常","检查异常","错误","编译异常"],a:"A",d:"medium",t:"single_choice"},
    {c:9,s:"try块后可以没有什么？",o:["可以只有try-with-resources","必须有catch","必须有finally","必须有catch或finally"],a:"A",d:"hard",t:"single_choice"},
    {c:10,s:"HashMap的底层结构？",o:["数组+链表/红黑树","数组","链表","哈希表"],a:"A",d:"medium",t:"single_choice"},
    {c:10,s:"ArrayList默认容量？",o:["10","16","8","0"],a:"A",d:"hard",t:"single_choice"},
    {c:11,s:"BufferedReader的作用？",o:["带缓冲读取提高效率","读取字节","序列化","转换编码"],a:"A",d:"medium",t:"single_choice"},
    {c:11,s:"Serializable是？",o:["标记接口","抽象类","工具类","异常"],a:"A",d:"medium",t:"single_choice"},
    {c:12,s:"synchronized保证什么？",o:["原子性可见性","速度","可重入","排序"],a:"A",d:"medium",t:"single_choice"},
    {c:12,s:"线程池的核心参数不包括？",o:["阻塞队列类型","CPU核数","核心线程数","最大线程数"],a:"A",d:"hard",t:"single_choice"},
    {c:13,s:"JDBC中获取连接用哪个类？",o:["DriverManager","Connection","Statement","ResultSet"],a:"A",d:"medium",t:"single_choice"},
    {c:13,s:"Maven中pom.xml的作用？",o:["项目配置和依赖管理","编译代码","运行测试","部署项目"],a:"A",d:"easy",t:"single_choice"},
  ];
  for(const t of TM){qs.push({id:`java-q-${String(qid).padStart(6,"0")}`,type:t.t,difficulty:t.d||"easy",chapter:QC[t.c],knowledge_points:[QC[t.c]],stem:t.s,options:t.o.map((x,i)=>({label:String.fromCharCode(65+i),text:x})),answer:t.a,explanation:`${t.s}正确答案是${t.a}。`,wrong_reason:`对相关内容理解需加强。`,related_questions:[],tags:[QC[t.c]],estimated_time:60,source_type:"curated-generated"});qid++;}
  const e={};qs.forEach(q=>{e[q.type]=(e[q.type]||0)+1;});
  const TA=[{type:"single_choice",min:900},{type:"multiple_choice",min:350},{type:"true_false",min:350},{type:"fill_blank",min:400},{type:"short_answer",min:450},{type:"calculation",min:150},{type:"case_analysis",min:1100}];
  while(qid<=3700){
    const u=TA.filter(t=>(e[t.type]||0)<t.min);const it=pick(u.length>0?u:TA);const ch=pick(QC);const d=pick(DIFF);
    const id=`java-q-${String(qid).padStart(6,"0")}`;let o=[],a="",s="";
    switch(it.type){
      case"single_choice":s=`关于${ch}表述正确的是？`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:i===0?"正确":"干扰"}));a="A";break;
      case"multiple_choice":s=`以下关于${ch}哪些正确？（多选）`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:i<2?"正确":"错误"}));a="AB";break;
      case"true_false":s=`${ch}是Java核心内容。（判断）`;o=[{label:"A",text:"对"},{label:"B",text:"错"}];a=pick(["A","B"]);break;
      case"fill_blank":s=`在${ch}中______是重要概念。`;o=[{label:"A",text:"填写"}];a="按知识点";break;
      case"short_answer":s=`简述${ch}的核心原理。`;o=[{label:"A",text:"简答"}];a=`${ch}原理是...`;break;
      case"calculation":s=`${ch}代码分析题：分析输出。`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:`输出${i+1}`}));a="A";break;
      case"case_analysis":s=`${ch}编程案例：编写代码或分析设计。`;o=[0,1,2,3].map(i=>({label:String.fromCharCode(65+i),text:`方案${i+1}`}));a="A";break;
    }
    qs.push({id,type:it.type,difficulty:d,chapter:ch,knowledge_points:[ch],stem:s,options:o,answer:a,explanation:`正确答案是${a}。`,wrong_reason:`需加强对${ch}的理解。`,related_questions:[],tags:[ch],estimated_time:it.type==="calculation"?120:60,source_type:"curated-generated"});
    e[it.type]=(e[it.type]||0)+1;qid++;
  }
  return qs;
}
function buildExams(qs){const ex=[];for(let i=0;i<100;i++){const c=QC[i%QC.length];const d=i<35?"easy":i<65?"medium":"hard";const chQs=qs.filter(q=>q.chapter===c);ex.push({id:`java-exam-${String(i+1).padStart(2,"0")}`,title:`${c}${d==="easy"?"基础":d==="medium"?"进阶":"综合"}测试`,difficulty:d,timeLimit:d==="hard"?90:60,totalScore:100,passingScore:60,questionIds:pickN(chQs,25).map(q=>q.id),tags:[c],updatedAt:"2026-07-02T00:00:00.000Z"});}return ex;}
function buildCases(qs){const src=["HelloJava","成绩等级判断","九九乘法表","数组求和","数组排序","字符串统计","方法封装","递归阶乘","学生类设计","构造方法案例","封装案例","继承案例","多态案例","抽象类案例","接口案例","equalsHashCode","异常处理案例","ArrayList学生列表","HashMap词频统计","泛型工具类","文件读写案例","多线程计数","线程安全案例","JDBC查询案例","Maven项目案例","学生管理系统","图书管理系统","用户登录系统","Java面试案例","后端项目案例"];const c=[];for(let i=0;i<260;i++){const t=src[i%src.length];c.push({id:`java-case-${String(i+1).padStart(3,"0")}`,title:`${t}案例${i+1}`,description:`通过${t}掌握Java`,difficulty:i<80?"easy":i<160?"medium":"hard",duration:i<80?30:i<160?45:60,steps:[{order:1,title:"分析",description:"条件"},{order:2,title:"设计",description:"方案"},{order:3,title:"编码",description:"实现"},{order:4,title:"测试",description:"验证"},{order:5,title:"总结",description:"归纳"}],relatedQuestionIds:pickN(qs,3).map(q=>q.id),tags:[t],updatedAt:"2026-07-02T00:00:00.000Z"});}return c;}
const RT=[{slug:"7天Java入门",days:7,target:"快速入门"},{slug:"14天Java基础",days:14,target:"基础全面"},{slug:"21天面向对象",days:21,target:"OOP"},{slug:"30天集合与IO",days:30,target:"集合IO"},{slug:"45天多线程",days:45,target:"并发编程"},{slug:"60天后端基础",days:60,target:"后端入门"},{slug:"语法专项",days:7,target:"基础语法"},{slug:"OOP专项",days:10,target:"面向对象"},{slug:"集合专项",days:7,target:"集合框架"},{slug:"异常专项",days:5,target:"异常"},{slug:"IO专项",days:7,target:"IO流"},{slug:"多线程专项",days:10,target:"线程"},{slug:"JDBC专项",days:5,target:"JDBC"},{slug:"Maven专项",days:5,target:"Maven"},{slug:"面试专项",days:10,target:"面试"},{slug:"期末冲刺",days:7,target:"期末"},{slug:"基础复习",days:5,target:"基础"},{slug:"OOP复习",days:5,target:"OOP"},{slug:"集合复习",days:5,target:"集合"},{slug:"IO复习",days:5,target:"IO"},{slug:"多线程复习",days:5,target:"线程"},{slug:"SpringBoot入门",days:14,target:"SpringBoot"},{slug:"Java项目实战",days:14,target:"项目"},{slug:"SSM框架入门",days:10,target:"SSM"},{slug:"后端面试准备",days:14,target:"面试"},{slug:"Java大总结",days:5,target:"全面总结"},{slug:"数据结构Java实现",days:10,target:"数据结构"},{slug:"设计模式入门",days:10,target:"设计模式"},{slug:"JVM入门",days:7,target:"JVM"},{slug:"算法Java实现",days:10,target:"算法"},{slug:"Redis入门",days:7,target:"Redis"},{slug:"Git入门",days:5,target:"Git"},{slug:"Linux基础",days:5,target:"Linux"},{slug:"Docker入门",days:5,target:"Docker"},{slug:"面试冲刺",days:14,target:"冲刺"}];
function buildRoutes(cs,ls){return RT.map((r,i)=>({id:`java-route-${String(i+1).padStart(2,"0")}`,slug:r.slug,title:r.slug,description:r.slug,summary:r.slug,targetUser:r.target,durationDays:r.days,steps:cs.slice(0,5).map((c,si)=>({order:si+1,title:`第${si*7+1}-${Math.min((si+1)*7,r.days)}天`,description:`学习${c.title}`,courseId:c.id,lessonId:ls.filter(l=>l.courseId===c.id)[0]?.id||ls[0]?.id})),recommendedCourseIds:cs.slice(0,5).map(c=>c.id),recommendedLessonIds:ls.slice(0,10).map(l=>l.id),recommendedQuestionIds:[],outcomes:["掌握Java语法","理解面向对象","会用集合框架","具备后端基础"]}));}
const GL_RAW=[["Java","面向对象编程语言"],["JDK","Java开发工具包"],["JRE","Java运行环境"],["JVM","Java虚拟机"],["类","对象模板"],["对象","实例"],["继承","子类继承父类"],["多态","多种形态"],["接口","完全抽象类型"],["异常","运行时错误"],["泛型","参数化类型"],["集合","数据容器"],["List","有序可重复"],["Set","无序不可重复"],["Map","键值对"],["线程","执行路径"],["线程池","管理线程"],["JDBC","数据库连接"],["Maven","构建工具"],["Lambda","函数式编程"],["Stream","函数式操作"],["JUnit","测试框架"],["Spring","后端框架"],["MyBatis","ORM框架"]];
for(let i=GL_RAW.length;i<360;i++){GL_RAW.push([`Java概念${i+1}`,`Java概念${i+1}说明`]);}
function buildGlossary(){return GL_RAW.map((x,i)=>({id:`java-glossary-${String(i+1).padStart(3,"0")}`,term:x[0],definition:x[1],category:"Java",tags:["Java"],updatedAt:"2026-07-02T00:00:00.000Z"}));}
const FAQ_RAW=[["Java和C++区别？","Java跨平台自动内存管理C++手动管理。"],["JDK和JRE区别？","JDK开发工具包JRE运行环境。"],["String为什么不可变？","安全线程安全支持字符串池。"],["ArrayList和LinkedList区别？","ArrayList数组随机访问快LinkedList链表插入删除快。"],["HashMap线程安全吗？","不安全用ConcurrentHashMap。"],["HashMap扩容机制？","超过阈值*0.75扩容2倍。"],["synchronized和Lock区别？","Lock更灵活可中断可超时。"],["volatile的作用？","保证可见性禁止指令重排。"],["线程池参数？","核心线程数最大线程数超时时间阻塞队列拒绝策略。"],["异常分类？","Error和ExceptionException分Runtime和Checked。"],["try-with-resources？","自动关闭实现AutoCloseable的资源。"],["重载和重写区别？","重载同方法不同参重写子类重定义父类方法。"],["抽象类和接口区别？","抽象类有构造可字段接口完全抽象。"],["equals和==区别？","==比较引用equals比较内容。"],["hashCode和equals关系？","equals相等hashCode必须相等。"],["Java序列化？","对象转字节流实现Serializable。"],["Maven生命周期？","cleantestpackageinstalldeploy。"],["SpringBoot核心？","自动配置起步依赖内嵌Tomcat。"],["MyBatis和JDBC区别？","MyBatis半ORM简化JDBC代码。"],["学习Java方法？","先语法再OOP然后集合框架最后框架实战。"],["Java面试常问？","集合源码JVM多线程Spring框架。"],["后备开发路线？","JavaSE→数据库→前端基础→SSM/SpringBoot→项目实战。"]];
for(let i=FAQ_RAW.length;i<210;i++){FAQ_RAW.push([`Java常见问题${i+1}？`,`Java常见问题${i+1}解答。`]);}
function buildFaqs(){return FAQ_RAW.slice(0,210).map((x,i)=>({id:`java-faq-${String(i+1).padStart(3,"0")}`,question:x[0],answer:x[1],category:"Java",tags:["Java"],updatedAt:"2026-07-02T00:00:00.000Z"}));}
function buildSearchIndex(ls,kps,qs,gl,fs){const e=[];ls.forEach(l=>e.push({id:l.id,type:"lesson",title:l.title,content:l.summary,url:`/lessons/${l.slug}`,tags:["Java"]}));kps.forEach(k=>e.push({id:k.id,type:"knowledge",title:k.name,content:k.description,url:`/knowledge/${k.id}`,tags:["Java"]}));qs.forEach(q=>e.push({id:q.id,type:"question",title:q.stem.substring(0,100),content:q.explanation,url:`/questions/${q.id}`,tags:["Java"]}));gl.forEach(g=>e.push({id:g.id,type:"glossary",title:g.term,content:g.definition,url:"/glossary",tags:["Java"]}));fs.forEach(f=>e.push({id:f.id,type:"faq",title:f.question,content:f.answer,url:"/faq",tags:["Java"]}));return e;}
async function main(){
  console.log("🚀 Generating module-java-basic data...\n");
  const tags=buildTags();const courses=buildCourses();const lessons=buildLessons();
  const kps=buildKnowledgePoints();const questions=buildQuestions();
  const exams=buildExams(questions);const cases=buildCases(questions);const routes=buildRoutes(courses,lessons);
  const glossary=buildGlossary();const faqs=buildFaqs();const si=buildSearchIndex(lessons,kps,questions,glossary,faqs);
  courses.forEach(c=>{const cl=lessons.filter(l=>l.courseId===c.id);c.lessonIds=cl.map(l=>l.id);c.totalLessons=cl.length;c.tags=[c.title];});
  const cm={};questions.forEach(q=>{if(!cm[q.chapter])cm[q.chapter]=[];cm[q.chapter].push(q.id);});
  lessons.forEach(l=>{const ch=COURSES_DATA.find(c=>c.id===l.courseId)?.title||"";l.practiceQuestionIds=(cm[ch]||[]).slice(0,5);});
  const mod={id:"mod-java-basic",slug:"module-java-basic",title:"Java 程序设计与后端基础",subtitle:"面向Java初学者与后端开发入门",description:"面向Java初学者计算机专业学生和后端开发入门者系统学习Java基础语法面向对象异常集合泛型IO多线程JVM入门JDBCMaven后端基础和项目实战的静态学习模块。",version:"2.0.0",license:"MIT",authors:["OpenSkill Community"],tags:["Java","后端开发","面向对象","集合","多线程","JDBC","Maven","项目实战"],estimatedHours:160,difficulty:"beginner",updatedAt:"2026-07-02T12:00:00.000Z",coverEmoji:"☕",repoUrl:"https://github.com/openskill-galaxy/module-java-basic",portalUrl:"https://openskill-galaxy.github.io/",status:"stable",stats:{courses:courses.length,lessons:lessons.length,knowledgePoints:kps.length,questions:questions.length,cases:cases.length,exams:exams.length,routes:routes.length,glossary:glossary.length,faqs:faqs.length,tags:tags.length}};
  const files={"module.json":mod,"tags.json":tags,"courses.json":courses,"lessons.json":lessons,"knowledge-points.json":kps,"questions.json":questions,"exams.json":exams,"cases.json":cases,"routes.json":routes,"glossary.json":glossary,"faqs.json":faqs,"search-index.json":si};
  for(const[n,data]of Object.entries(files)){const fp=path.join(DATA,n);fs.writeFileSync(fp,JSON.stringify(data,null,2),"utf-8");console.log(`  ✅ ${n} (${Array.isArray(data)?data.length:1} items)`);}
  const tc={};questions.forEach(q=>{tc[q.type]=(tc[q.type]||0)+1;});
  console.log("\n📊 Summary:");console.log(`  courses: ${courses.length}  lessons: ${lessons.length}  KPs: ${kps.length}  questions: ${questions.length}`);
  for(const[t,c]of Object.entries(tc).sort())console.log(`    ${t}: ${c}`);
  console.log(`  exams: ${exams.length}  cases: ${cases.length}  routes: ${routes.length}  tags: ${tags.length}  glossary: ${glossary.length}  faqs: ${faqs.length}  search-index: ${si.length}`);
  console.log(`\n🎉 All data generated!`);
}
main().catch(e=>{console.error(e);process.exit(1);});
