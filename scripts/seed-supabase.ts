/**
 * Seed script for Supabase
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx ts-node scripts/seed-supabase.ts
 *
 * Prerequisites:
 *   1. Run scripts/supabase-schema.sql in the Supabase SQL Editor
 *   2. Disable "Confirm email" in Auth > Settings
 *   3. Get the service role key from Settings > API
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Old db.json data embedded inline to avoid dependency on deleted file
const users = [
  {
    id: '1',
    username: 'admin',
    password: '123',
    roles: ['ADMIN'],
    features: { isArticleRatingEnabled: true, isCounterEnabled: true },
    avatar:
      'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=900&auto=format&fit=crop&q=60',
    jsonSettings: {
      theme: 'app_light_theme',
      isFirstVisit: true,
      settingsPageHasBeenOpen: false,
      isArticlesPageWasOpened: true
    }
  },
  {
    id: '2',
    username: 'user',
    password: '123',
    roles: ['USER'],
    features: { isArticleRatingEnabled: false, isCounterEnabled: false },
    avatar: 'https://i.pinimg.com/originals/9a/e0/2d/9ae02d4b4288396108ef77830a59e060.jpg',
    jsonSettings: { isArticlesPageWasOpened: true, theme: 'app_orange_theme' }
  },
  {
    id: '3',
    username: 'manager',
    password: '123',
    roles: ['MANAGER'],
    features: { isArticleRatingEnabled: false, isCounterEnabled: true },
    avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
    jsonSettings: { isArticlesPageWasOpened: true }
  },
  {
    id: '4',
    username: 'testuser',
    password: '123',
    roles: ['ADMIN'],
    features: { isArticleRatingEnabled: true, isCounterEnabled: true },
    avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
    jsonSettings: {}
  }
];

const profiles: Record<string, Record<string, unknown>> = {
  '1': {
    first: 'John',
    lastname: 'Doe',
    age: 465,
    currency: 'EUR',
    country: 'Ukraine',
    city: 'Moscow',
    username: 'admin213'
  },
  '2': {
    first: 'ulbi tv',
    lastname: 'asf',
    age: 465,
    currency: 'EUR',
    country: 'Ukraine',
    city: 'Moscow',
    username: 'ulbi tv'
  },
  '4': {
    first: 'test',
    lastname: 'user',
    age: 465,
    currency: 'EUR',
    country: 'Ukraine',
    city: 'Moscow',
    username: 'testuser'
  }
};

const articles = [
  { id: '1', title: 'ES2024: Новые возможности JavaScript - Updated', subtitle: 'Обзор ключевых нововведений стандарта ECMAScript 2024', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png', type: ['IT'], userId: '1', views: 15420, createdAt: '15.01.2024', content: '<h3>Введение в ES2024</h3><p>ECMAScript 2024 принёс множество долгожданных улучшений в JavaScript. В этой статье мы рассмотрим наиболее значимые изменения, которые уже доступны разработчикам.</p><p>Одним из главных нововведений стал метод Object.groupBy(), позволяющий группировать элементы массива по заданному критерию. Это упрощает работу с данными и делает код более читаемым.</p><pre><code>const inventory = [\n  { name: \'asparagus\', type: \'vegetables\' },\n  { name: \'bananas\', type: \'fruit\' },\n  { name: \'cherries\', type: \'fruit\' }\n];\n\nconst result = Object.groupBy(inventory, ({ type }) => type);\n// { vegetables: [...], fruit: [...] }</code></pre><h3>Promise.withResolvers()</h3><p>Новый статический метод Promise.withResolvers() возвращает объект с тремя свойствами: promise, resolve и reject. Это упрощает паттерн создания Promise с внешним управлением.</p><p>Раньше для подобного функционала приходилось писать дополнительный код, теперь же всё доступно из коробки.</p><pre><code>const { promise, resolve, reject } = Promise.withResolvers();\n\nsetTimeout(() => resolve(\'Done!\'), 1000);\n\nawait promise; // \'Done!\'</code></pre><figure><img src="https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png" alt="Пример работы с новыми методами в браузере" /><figcaption>Пример работы с новыми методами в браузере</figcaption></figure>' },
  { id: '2', title: 'Python для анализа данных', subtitle: 'Библиотеки pandas, numpy и matplotlib для работы с данными', img: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/113415626/original/a17667d573bf34559bf0d35993ed76e57d43ad00/program-python-scripts-for-automation-and-data-mining.png', views: 8934, createdAt: '10.12.2023', userId: '1', type: ['IT'], content: '<h3>Почему Python для Data Science?</h3><p>Python стал стандартом де-факто для анализа данных благодаря простому синтаксису и мощной экосистеме библиотек. Pandas позволяет работать с табличными данными, NumPy обеспечивает быстрые математические операции, а Matplotlib визуализирует результаты.</p><p>В этой статье мы рассмотрим базовые операции с данными: загрузку, очистку, трансформацию и визуализацию.</p><pre><code>import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Загрузка данных\ndf = pd.read_csv(\'sales.csv\')\n\n# Группировка и агрегация\nmonthly_sales = df.groupby(\'month\')[\'revenue\'].sum()\n\n# Визуализация\nmonthly_sales.plot(kind=\'bar\')\nplt.title(\'Выручка по месяцам\')\nplt.show()</code></pre><h3>Очистка данных</h3><p>Реальные данные часто содержат пропуски, дубликаты и аномалии. Pandas предоставляет удобные методы для работы с такими проблемами: dropna(), fillna(), drop_duplicates() и другие.</p>' },
  { id: '3', title: 'Kotlin Multiplatform: один код для всех платформ', subtitle: 'Как разрабатывать кроссплатформенные приложения на Kotlin', img: 'https://miro.medium.com/max/1200/1*FNakkrty3kjOvNU8m5iQfw.png', type: 'SCIENCE', userId: '1', views: 12450, createdAt: '05.11.2023', content: '<h3>Что такое Kotlin Multiplatform?</h3><p>Kotlin Multiplatform (KMP) — технология от JetBrains, позволяющая использовать общий код на Kotlin для разных платформ: Android, iOS, Desktop и Web. В отличие от Flutter или React Native, KMP не навязывает общий UI, а фокусируется на бизнес-логике.</p><p>Это даёт разработчикам свободу использовать нативные UI-компоненты каждой платформы, сохраняя при этом единую кодовую базу для логики приложения.</p><pre><code>// Общий код в модуле shared\nexpect class Platform() {\n    val name: String\n}\n\nfun greeting(): String {\n    return "Hello, ${Platform().name}!"\n}\n\n// Android реализация\nactual class Platform actual constructor() {\n    actual val name: String = "Android ${Build.VERSION.SDK_INT}"\n}\n\n// iOS реализация\nactual class Platform actual constructor() {\n    actual val name: String = UIDevice.currentDevice.systemName()\n}</code></pre><h3>Преимущества подхода</h3><p>Главное преимущество KMP — возможность постепенной миграции. Вы можете начать с выноса небольшой части логики в общий модуль и постепенно расширять его.</p><p>Компании вроде Netflix, VMware и Philips уже используют Kotlin Multiplatform в продакшене.</p>' },
  { id: '4', title: 'Функциональное программирование в Scala', subtitle: 'Иммутабельность, чистые функции и монады', img: 'https://pluspng.com/img-png/scala-logo-png-scala-logo-1200x675.png', views: 6780, createdAt: '20.10.2023', userId: '1', type: ['IT'], content: '<h3>Основы функционального подхода</h3><p>Scala сочетает объектно-ориентированное и функциональное программирование, что делает её идеальным языком для изучения ФП-концепций. Иммутабельные структуры данных, чистые функции и композиция — основа функционального стиля.</p><p>Чистые функции не имеют побочных эффектов и всегда возвращают одинаковый результат для одинаковых входных данных. Это делает код предсказуемым и легко тестируемым.</p><pre><code>// Иммутабельные коллекции\nval numbers = List(1, 2, 3, 4, 5)\nval doubled = numbers.map(_ * 2)  // List(2, 4, 6, 8, 10)\n\n// Композиция функций\nval addOne: Int => Int = _ + 1\nval multiplyTwo: Int => Int = _ * 2\nval composed = addOne.andThen(multiplyTwo)\ncomposed(3)  // (3 + 1) * 2 = 8\n\n// Option монада для безопасной работы с null\ndef findUser(id: Int): Option[User] = ???\nfindUser(1).map(_.name).getOrElse("Unknown")</code></pre>' },
  { id: '5', title: 'Go: Конкурентность и горутины', subtitle: 'Практическое руководство по параллельному программированию', img: 'https://www.itsec.ru/hs-fs/hubfs/ISR/Golang.png?width=750&name=Golang.png', views: 9340, createdAt: '15.09.2023', userId: '1', type: ['IT'], content: '<h3>Модель конкурентности в Go</h3><p>Go предлагает элегантную модель конкурентности, основанную на горутинах и каналах. Горутины — это легковесные потоки, управляемые рантаймом Go. Запуск миллиона горутин — обычная практика в Go-приложениях.</p><p>Каналы обеспечивают безопасное взаимодействие между горутинами, следуя принципу: \'Не общайтесь через разделяемую память; разделяйте память через общение\'.</p><pre><code>func worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        fmt.Printf("Worker %d processing job %d\\n", id, j)\n        time.Sleep(time.Second)\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 100)\n    results := make(chan int, 100)\n\n    // Запуск 3 воркеров\n    for w := 1; w <= 3; w++ {\n        go worker(w, jobs, results)\n    }\n\n    // Отправка задач\n    for j := 1; j <= 9; j++ {\n        jobs <- j\n    }\n    close(jobs)\n\n    // Сбор результатов\n    for a := 1; a <= 9; a++ {\n        <-results\n    }\n}</code></pre>' },
  { id: '6', title: 'Spring Boot 3: Новая эра Java-разработки', subtitle: 'Миграция на Java 17+ и нативная компиляция с GraalVM', img: 'https://andreyex.ru/wp-content/uploads/2018/05/Kak-ustanovit-Java-s-apt-na-Ubuntu-18.04.jpg', type: ['SCIENCE'], userId: '1', views: 7820, createdAt: '01.08.2023', content: '<h3>Что нового в Spring Boot 3</h3><p>Spring Boot 3 требует минимум Java 17 и приносит полную поддержку Jakarta EE 10. Одно из главных нововведений — нативная компиляция с GraalVM, позволяющая создавать исполняемые файлы с мгновенным запуском.</p><p>Micrometer Observation API унифицирует работу с метриками и трассировкой, а новый HTTP-клиент на базе Java HttpClient заменяет устаревший RestTemplate.</p><pre><code>@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    \n    private final RestClient restClient;\n    \n    public UserController(RestClient.Builder builder) {\n        this.restClient = builder\n            .baseUrl("https://api.example.com")\n            .build();\n    }\n    \n    @GetMapping("/{id}")\n    public User getUser(@PathVariable Long id) {\n        return restClient.get()\n            .uri("/users/{id}", id)\n            .retrieve()\n            .body(User.class);\n    }\n}</code></pre>' },
  { id: '7', title: 'Ruby on Rails 7: Hotwire и современный фронтенд', subtitle: 'Как создавать интерактивные приложения без JavaScript-фреймворков', img: 'https://res.cloudinary.com/practicaldev/image/fetch/s--oqV3akcU--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/pgnw91fs7tpxn0wyeqh2.jpg', views: 9500, createdAt: '10.09.2023', userId: '2', type: ['IT'], content: '<h3>Hotwire: HTML Over The Wire!!!</h3><p>Rails 7 представил Hotwire — подход к созданию интерактивных веб-приложений, отправляющий HTML вместо JSON. Turbo и Stimulus позволяют добавить динамичность без написания сложного JavaScript-кода.</p><p>Turbo Drive ускоряет навигацию, Turbo Frames обновляют части страницы, а Turbo Streams позволяют обновлять DOM через WebSocket.</p><pre><code># app/controllers/messages_controller.rb\nclass MessagesController < ApplicationController\n  def create\n    @message = Message.create!(message_params)\n    \n    respond_to do |format|\n      format.turbo_stream\n      format.html { redirect_to messages_path }\n    end\n  end\nend\n\n# app/views/messages/create.turbo_stream.erb\n<%= turbo_stream.append "messages" do %>\n  <%= render @message %>\n<% end %></code></pre>' },
  { id: '8', title: 'TypeScript 5: Декораторы и производительность', subtitle: 'Обзор новых возможностей TypeScript 5.x', img: 'https://miro.medium.com/max/1400/1*aTCN2ctKNoZupUCMP0hQuw.png', views: 18650, createdAt: '25.06.2023', userId: '1', type: ['IT'], content: '<h3>Стандартные декораторы ECMAScript</h3><p>TypeScript 5 принёс поддержку стандартных декораторов ECMAScript, которые отличаются от экспериментальных декораторов в предыдущих версиях. Новый синтаксис более строгий и предсказуемый.</p><p>Также улучшена производительность компилятора — сборка крупных проектов стала на 10-25% быстрее благодаря оптимизациям в tsc.</p><pre><code>// Стандартные декораторы\nfunction logged<T extends (...args: any[]) => any>(\n  target: T,\n  context: ClassMethodDecoratorContext\n) {\n  return function(this: any, ...args: Parameters<T>): ReturnType<T> {\n    console.log(`Calling ${String(context.name)}`);\n    return target.apply(this, args);\n  };\n}\n\nclass Calculator {\n  @logged\n  add(a: number, b: number): number {\n    return a + b;\n  }\n}\n\n// const инференция\nconst colors = [\'red\', \'green\', \'blue\'] as const;\ntype Color = typeof colors[number]; // \'red\' | \'green\' | \'blue\'</code></pre><h3>Улучшения в работе с типами</h3><p>Добавлена поддержка const type parameters, позволяющая выводить литеральные типы без явного as const. Улучшен вывод типов для замыканий и упрощена работа с union-типами.</p>' },
  { id: '9', title: 'React Server Components: Будущее веб-разработки', subtitle: 'Как серверные компоненты меняют архитектуру React-приложений', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', views: 22340, createdAt: '01.06.2023', userId: '2', type: ['IT'], content: '<h3>Что такое Server Components?</h3><p>React Server Components (RSC) — революционный подход к рендерингу React-приложений. Серверные компоненты выполняются только на сервере и отправляют клиенту готовый результат, без JavaScript-бандла компонента.</p><p>Это позволяет использовать тяжёлые зависимости (например, библиотеки для работы с markdown или подсветки синтаксиса) без увеличения размера клиентского бандла.</p><pre><code>// app/page.tsx - серверный компонент по умолчанию\nimport { db } from \'@/lib/db\';\nimport { ArticleList } from \'./ArticleList\';\n\nexport default async function HomePage() {\n  // Прямой доступ к базе данных на сервере\n  const articles = await db.article.findMany({\n    orderBy: { createdAt: \'desc\' },\n    take: 10\n  });\n\n  return (\n    <main>\n      <h1>Последние статьи</h1>\n      <ArticleList articles={articles} />\n    </main>\n  );\n}\n\n// components/LikeButton.tsx - клиентский компонент\n\'use client\';\n\nexport function LikeButton({ articleId }: { articleId: string }) {\n  const [liked, setLiked] = useState(false);\n  return <button onClick={() => setLiked(!liked)}>❤️</button>;\n}</code></pre>' },
  { id: '10', title: 'Node.js 20: Новый уровень производительности', subtitle: 'Permission Model, стабильный Test Runner и улучшения V8', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', views: 11230, createdAt: '15.05.2023', userId: '2', type: ['IT'], content: '<h3>Permission Model для безопасности</h3><p>Node.js 20 представил экспериментальную модель разрешений, позволяющую ограничить доступ к файловой системе, дочерним процессам и другим ресурсам. Это важный шаг к запуску непроверенного кода в изолированной среде.</p><p>Встроенный Test Runner стал стабильным и теперь полностью готов к использованию в продакшене. Он поддерживает моки, покрытие кода и параллельное выполнение тестов.</p><pre><code>// Запуск с ограничениями\n// node --experimental-permission --allow-fs-read=/app index.js\n\n// Встроенный test runner\nimport { test, mock } from \'node:test\';\nimport assert from \'node:assert\';\n\ntest(\'async test with mock\', async (t) => {\n  const fn = mock.fn(() => 42);\n  \n  assert.strictEqual(fn(), 42);\n  assert.strictEqual(fn.mock.calls.length, 1);\n});\n\n// Новый синтаксис для import.meta\nconsole.log(import.meta.dirname);  // Замена __dirname\nconsole.log(import.meta.filename); // Замена __filename</code></pre>' },
  { id: '11', title: 'Инфляция и монетарная политика', subtitle: 'Как центральные банки борются с ростом цен', img: 'https://images.unsplash.com/photo-1635840420799-f75477b0b977?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: ['ECONOMICS'], userId: '1', views: 5670, createdAt: '20.04.2023', content: '<h3>Причины современной инфляции</h3><p>Инфляция последних лет вызвана комбинацией факторов: нарушение цепочек поставок после пандемии, рост цен на энергоносители, масштабные программы количественного смягчения. Центральные банки отреагировали повышением процентных ставок.</p><p>Повышение ставок делает кредиты дороже, снижая потребительский спрос и инвестиционную активность. Однако слишком агрессивное ужесточение может привести к рецессии — центробанки ищут баланс между инфляцией и экономическим ростом.</p><h3>Инструменты монетарной политики</h3><p>Помимо ключевой ставки, центральные банки используют операции на открытом рынке (покупка и продажа государственных облигаций), нормативы обязательных резервов и forward guidance — коммуникацию о будущих намерениях.</p><p>Эффективность этих инструментов зависит от доверия экономических агентов к политике центробанка. Если бизнес и потребители верят, что инфляция будет под контролем, их ожидания становятся самосбывающимся пророчеством.</p>' },
  { id: '12', title: 'Криптовалюты и традиционные финансы', subtitle: 'Интеграция блокчейна в банковскую систему', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png', views: 8920, createdAt: '10.03.2023', userId: '2', type: ['ECONOMICS'], content: '<h3>CBDC: Цифровые валюты центробанков</h3><p>Более 100 стран исследуют или тестируют цифровые валюты центральных банков (CBDC). В отличие от криптовалют, CBDC эмитируются государством и имеют статус законного платёжного средства.</p><p>CBDC могут упростить трансграничные платежи, снизить издержки на наличное обращение и расширить финансовую доступность. Однако есть риски для конфиденциальности и стабильности банковской системы.</p><h3>Институциональное принятие</h3><p>Крупные финансовые институты всё активнее интегрируют криптовалюты. BlackRock запустил Bitcoin ETF, банки предлагают кастодиальные услуги, а платёжные системы добавляют поддержку цифровых активов.</p><p>Регулирование становится более чётким: MiCA в Европе, законопроекты в США. Это создаёт правовую определённость, необходимую для институциональных инвесторов.</p>' },
  { id: '13', title: 'Квантовые компьютеры: прорыв 2024', subtitle: 'Как квантовые вычисления меняют науку и технологии', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bloch_sphere.svg/1200px-Bloch_sphere.svg.png', views: 14560, createdAt: '01.02.2024', userId: '1', type: ['SCIENCE'], content: '<h3>Квантовое превосходство</h3><p>Квантовые компьютеры используют принципы квантовой механики — суперпозицию и запутанность — для решения задач, недоступных классическим компьютерам. В 2024 году несколько компаний продемонстрировали квантовое превосходство на практически значимых задачах.</p><p>IBM, Google и китайские исследователи соревнуются в увеличении числа кубитов и снижении ошибок. Квантовая коррекция ошибок — ключевая технология для масштабирования.</p><h3>Практические применения</h3><p>Квантовые алгоритмы уже применяются для моделирования молекул в фармацевтике, оптимизации логистики и машинного обучения. Квантовое моделирование позволяет предсказывать свойства новых материалов и лекарств.</p><p>Однако угроза для криптографии реальна: алгоритм Шора может взломать RSA и другие системы с открытым ключом. Постквантовая криптография становится приоритетом.</p>' },
  { id: '14', title: 'CRISPR: редактирование генома человека', subtitle: 'Этические и научные аспекты генной терапии', img: 'https://plus.unsplash.com/premium_photo-1681487118711-2c8e629d4313?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: ['SCIENCE'], userId: '1', views: 9870, createdAt: '15.12.2023', content: '<h3>Революция в генетике</h3><p>CRISPR-Cas9 произвёл революцию в генетике, позволив точно редактировать ДНК. В 2023 году FDA одобрило первую CRISPR-терапию для лечения серповидноклеточной анемии — историческое событие для медицины.</p><p>Технология работает как «молекулярные ножницы»: направляющая РНК находит нужную последовательность ДНК, а белок Cas9 разрезает её. Клетка затем восстанавливает разрыв, и на этом этапе можно внести нужные изменения.</p><h3>Этические дилеммы</h3><p>Редактирование зародышевых клеток остаётся спорным: изменения передаются потомкам, и долгосрочные последствия неизвестны. После скандала с «CRISPR-детьми» в Китае научное сообщество призывает к мораторию.</p><p>Соматическая генная терапия (изменение клеток пациента, не передающееся по наследству) вызывает меньше возражений и активно развивается для лечения рака, наследственных заболеваний и ВИЧ.</p>' },
  { id: '15', title: 'Нейросети и искусственный интеллект', subtitle: 'От GPT до AGI: путь к общему искусственному интеллекту', img: 'https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: ['SCIENCE'], userId: '2', views: 25670, createdAt: '05.01.2024', content: '<h3>Большие языковые модели</h3><p>GPT-4, Claude, Gemini и другие большие языковые модели (LLM) демонстрируют впечатляющие способности: генерация текста, кода, анализ изображений, решение логических задач. Однако до общего искусственного интеллекта (AGI) ещё далеко.</p><p>Архитектура трансформеров, лежащая в основе LLM, использует механизм внимания для обработки последовательностей. Масштабирование моделей (больше параметров, больше данных) приводит к эмерджентным способностям.</p><h3>Ограничения и риски</h3><p>Современные модели страдают от галлюцинаций, не имеют истинного понимания и не могут надёжно рассуждать. Они обучены на статичных данных и не могут обновлять знания без переобучения.</p><p>Риски включают дезинформацию, автоматизацию кибератак и экономическое неравенство. Регулирование ИИ становится приоритетом для правительств по всему миру.</p><pre><code># Пример работы с OpenAI API\nfrom openai import OpenAI\n\nclient = OpenAI()\n\nresponse = client.chat.completions.create(\n    model="gpt-4",\n    messages=[\n        {"role": "system", "content": "Ты полезный ассистент."},\n        {"role": "user", "content": "Объясни квантовую запутанность простыми словами"}\n    ],\n    temperature=0.7\n)\n\nprint(response.choices[0].message.content)</code></pre>' },
  { id: '16', title: 'Глобальные цепочки поставок', subtitle: 'Уроки пандемии и новая география производства', img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: ['ECONOMICS'], userId: '1', views: 4230, createdAt: '01.11.2023', content: '<h3>Уязвимость глобализации</h3><p>Пандемия COVID-19 обнажила хрупкость глобальных цепочек поставок. Зависимость от единственных поставщиков, just-in-time логистика и концентрация производства в нескольких регионах создали системные риски.</p><p>Компании переосмысливают стратегии: friend-shoring (перенос производства в дружественные страны), near-shoring (приближение к рынкам сбыта) и увеличение запасов. Устойчивость становится важнее эффективности.</p><h3>Новая индустриализация</h3><p>США и Европа инвестируют в возвращение стратегических производств: полупроводников, аккумуляторов, фармацевтики. CHIPS Act и Inflation Reduction Act в США, European Chips Act в ЕС — примеры новой промышленной политики.</p><p>Однако полная автаркия невозможна и неэффективна. Оптимальная стратегия — диверсификация поставщиков и создание резервов для критических компонентов.</p>' },
  { id: '17', title: 'Rust: безопасность без компромиссов', subtitle: 'Почему крупные компании переходят на Rust', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1200px-Rust_programming_language_black_logo.svg.png', views: 13450, createdAt: '20.09.2023', userId: '2', type: ['IT'], content: '<h3>Система владения</h3><p>Rust гарантирует безопасность памяти без сборщика мусора благодаря системе владения (ownership). Каждое значение имеет единственного владельца, и когда владелец выходит из области видимости, память освобождается.</p><p>Заимствование (borrowing) позволяет передавать ссылки без передачи владения. Компилятор проверяет, что ссылки не переживают данные, на которые указывают — исключая целые классы багов.</p><pre><code>// Владение и перемещение\nfn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;  // s1 больше недействительна\n    // println!("{}", s1);  // Ошибка компиляции!\n    println!("{}", s2);\n}\n\n// Заимствование\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}  // s выходит из области видимости, но не владеет данными\n\n// Мутабельное заимствование (только одна в области видимости)\nfn append_world(s: &mut String) {\n    s.push_str(", world");\n}</code></pre><h3>Индустриальное принятие</h3><p>Microsoft использует Rust в Windows, Google — в Android и Chrome, Amazon — в инфраструктуре AWS. Linux kernel принял Rust как второй язык после C. Безопасность памяти — главная причина.</p><p>70% уязвимостей в Microsoft связаны с ошибками памяти. Rust исключает их на этапе компиляции, сохраняя производительность C/C++.</p>' },
  { id: '18', title: 'Термоядерный синтез: энергия будущего', subtitle: 'Прорывы в управляемом термоядерном синтезе', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/ITER_Tokamak_and_Plant_Systems_%282016%29_%2841783636452%29.jpg/1200px-ITER_Tokamak_and_Plant_Systems_%282016%29_%2841783636452%29.jpg', views: 7890, createdAt: '10.10.2023', userId: '1', type: ['SCIENCE'], content: '<h3>Зажигание плазмы</h3><p>В декабре 2022 года Национальная лаборатория Лоуренса Ливермора (NIF) впервые достигла зажигания — термоядерная реакция выделила больше энергии, чем было затрачено на её инициацию. Это исторический момент для энергетики.</p><p>Термоядерный синтез — слияние лёгких ядер (обычно дейтерия и трития) в более тяжёлые с выделением огромной энергии. Это тот же процесс, что питает Солнце. Топливо практически неограничено, а отходы минимальны.</p><h3>Путь к коммерциализации</h3><p>ITER во Франции — крупнейший международный проект термоядерного реактора — планирует первую плазму к 2025 году. Частные компании (Commonwealth Fusion Systems, TAE Technologies) обещают коммерческие реакторы к 2030-м.</p><p>Главные вызовы: удержание плазмы при 150 миллионах градусов, материалы, выдерживающие нейтронную бомбардировку, и экономическая эффективность. Но прогресс ускоряется благодаря высокотемпературным сверхпроводникам и ИИ-оптимизации.</p>' },
  { id: '19', title: 'The Future of AI in Web Development: What Developers Need to Know', subtitle: 'Explore how artificial intelligence is reshaping the landscape of web development', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop', views: 15420, createdAt: '20.01.2026', userId: '1', type: ['IT'], content: '<h3>AI Transforming Development</h3><p>Explore how artificial intelligence is reshaping the landscape of web development. From automated code generation to intelligent debugging tools, AI is transforming how developers build modern applications.</p><p>The integration of AI tools into development workflows has accelerated significantly, with features like code completion, bug detection, and automated testing becoming standard in modern IDEs.</p>' },
  { id: '20', title: 'Minimalist Design Principles for Modern User Interfaces', subtitle: 'Learn the essential principles of minimalist design for clean, user-friendly interfaces', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop', views: 8730, createdAt: '18.01.2026', userId: '2', type: ['IT'], content: '<h3>The Power of Minimalism</h3><p>Learn the essential principles of minimalist design and how to apply them to create clean, user-friendly interfaces that enhance user experience and drive engagement.</p><p>Minimalist design focuses on removing unnecessary elements while preserving functionality, creating interfaces that are both beautiful and highly usable.</p>' },
  { id: '21', title: 'Building Scalable Startups: Lessons from Successful Founders', subtitle: 'Key strategies and insights from successful startup founders on building scalable companies', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop', views: 23100, createdAt: '15.01.2026', userId: '1', type: ['ECONOMICS'], content: '<h3>Scaling Your Business</h3><p>Discover key strategies and insights from successful startup founders on building companies that can scale efficiently while maintaining quality and culture.</p><p>From hiring the right team to implementing scalable systems, learn the proven approaches that have helped startups grow from small teams to global enterprises.</p>' },
  { id: '22', title: 'Breakthrough in Quantum Computing: A New Era Begins', subtitle: 'A major milestone in quantum computing that could revolutionize technology', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop', views: 45200, createdAt: '22.01.2026', userId: '1', type: ['SCIENCE'], content: '<h3>Quantum Revolution</h3><p>Scientists have achieved a major milestone in quantum computing that could revolutionize everything from drug discovery to climate modeling. Here\'s what it means for the future.</p><p>This breakthrough demonstrates practical quantum advantage for the first time, solving problems that would take classical computers millions of years in mere hours.</p>' },
  { id: '23', title: 'The Complete Guide to Mental Wellness in the Digital Age', subtitle: 'Practical strategies for maintaining mental health in an increasingly connected world', img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop', views: 31500, createdAt: '10.01.2026', userId: '2', type: ['SCIENCE'], content: '<h3>Digital Wellness Strategies</h3><p>In an increasingly connected world, maintaining mental health has become more challenging. This comprehensive guide offers practical strategies for digital wellness.</p><p>Learn how to set healthy boundaries with technology, practice mindful usage, and create digital habits that support rather than hinder your mental wellbeing.</p>' },
  { id: '24', title: 'Hidden Gems: 10 Underrated Destinations for 2026', subtitle: 'Discover breathtaking destinations that offer authentic experiences and adventures', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop', views: 19800, createdAt: '08.01.2026', userId: '1', type: ['ECONOMICS'], content: '<h3>Off the Beaten Path</h3><p>Skip the crowded tourist spots and discover these breathtaking destinations that offer authentic experiences, stunning landscapes, and unforgettable adventures.</p><p>From remote islands to hidden mountain villages, these destinations provide the perfect escape from overtourism while offering rich cultural experiences.</p>' },
  { id: '25', title: 'Next.js 16: Everything You Need to Know About the Latest Release', subtitle: 'A deep dive into the newest features of Next.js 16 and React 19.2 integration', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', views: 28900, createdAt: '25.01.2026', userId: '2', type: ['IT'], content: '<h3>Next.js 16 Features</h3><p>A deep dive into the newest features of Next.js 16, including cache components, improved performance, and the new React 19.2 integration that\'s changing how we build apps.</p><p>The latest release brings significant improvements to server components, streaming, and edge rendering, making it easier than ever to build fast, scalable applications.</p>' },
  { id: '26', title: 'Color Theory in UI Design: Creating Harmonious Palettes', subtitle: 'Master the art of color selection for digital interfaces', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop', views: 12400, createdAt: '12.01.2026', userId: '1', type: ['IT'], content: '<h3>The Science of Color</h3><p>Master the art of color selection for digital interfaces. Learn how to create color palettes that evoke the right emotions and improve usability.</p><p>Understanding color psychology and accessibility requirements is essential for creating interfaces that not only look beautiful but also work for all users.</p>' },
  { id: '27', title: 'The Economics of Remote Work: A 2026 Perspective', subtitle: 'How remote work is reshaping global economies and business operations', img: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=800&h=600&fit=crop', views: 17600, createdAt: '05.01.2026', userId: '2', type: ['ECONOMICS'], content: '<h3>The Remote Revolution</h3><p>How remote work is reshaping global economies, real estate markets, and the way businesses operate. A comprehensive analysis of the distributed workforce revolution.</p><p>From changing urban landscapes to new approaches to collaboration, the shift to remote work has fundamentally altered how we think about work and productivity.</p>' }
];

const comments = [
  { id: '1', text: 'some comment', articleId: '1', userId: '1' },
  { id: '2', text: 'some comment 2', articleId: '1', userId: '1' },
  { id: '3', text: 'some comment 3', articleId: '1', userId: '1' },
  { articleId: '1', userId: '1', text: '123', id: '4Cljjzl' },
  { articleId: '1', userId: '1', text: '123asfasf', id: 'AEM4Dvc' },
  { articleId: '1', userId: '2', text: '123asfasf', id: 'IFEOWl0' },
  { articleId: '1', userId: '2', text: 'привет мир', id: 'dBacYRZ' },
  { articleId: '1', userId: '2', text: 'хехехехе', id: 'rBX_C-e' },
  { articleId: '1', userId: '2', text: 'фыафыа', id: '5k0ApX-' },
  { articleId: '1', userId: '2', text: 'sdfsdfsd', id: 'w-HDIRq' },
  { articleId: '1', userId: '2', text: 'asdasdasd', id: 'MVvGQoZ' },
  { articleId: '3', userId: '1', text: 'comment 1', id: 'bAs7YBE' },
  { articleId: '2', userId: '1', text: 'python!!!', id: 'p5rMadd' },
  { articleId: '3', userId: '1', text: '123213', id: 'Zu_RNuF' },
  { articleId: '8', userId: '1', text: 'dfdsf', id: '4rFHQgJ' },
  { articleId: '8', userId: '1', text: 'sdfsdf', id: 'yYEdTI-' },
  { articleId: '7', userId: '1', text: '123213', id: 'TR1yDY6' },
  { articleId: '7', userId: '1', text: '112', id: 'wSAhqy5' },
  { articleId: '18', userId: '1', text: '12', id: 'r6b1z-N' },
  { articleId: '18', userId: '2', text: 'привет', id: 'DENfTu6' },
  { articleId: '7', userId: '2', text: '33', id: 'Ps59wrg' },
  { articleId: '7', userId: '2', text: '123', id: 'zzYVth3' },
  { articleId: '7', userId: '2', text: '123', id: 'WjF4c_d' },
  { articleId: '1', userId: '2', text: 'privet', id: 'fta748h' },
  { articleId: '2', userId: '2', text: 'питон топ', id: 'ZlmlUrg' },
  { articleId: '7', userId: '1', text: '123', id: 'KmtWJR_' },
  { articleId: '8', userId: '2', text: 'asdasd', id: 'eB1A-7c' },
  { articleId: '2', userId: '1', text: 'class', id: 'wAZ_hJM' },
  { articleId: '2', userId: '1', text: 'asfasf', id: 'SygCNYE' },
  { articleId: '27', userId: '1', text: 'dwadawda', id: 'SSTTGsB' },
  { articleId: '27', userId: '1', text: 'wadwa', id: 'fAYzRrK' }
];

const articleRatingsData = [
  { id: '1', rate: 4, feedback: 'Хорошая статья', userId: '1', articleId: '1' },
  { userId: '1', articleId: '3', rate: 3, feedback: '', id: 'I7ofk1u' },
  { userId: '1', articleId: '9', rate: 5, feedback: 'asdasdasdasd', id: 'Y7MhPzo' },
  { userId: '1', articleId: '10', rate: 1, feedback: 'отстой', id: 'II0a75O' },
  { userId: '1', articleId: '7', rate: 3, feedback: '', id: 'bcPnbbZ' },
  { userId: '2', articleId: '1', rate: 4, feedback: 'asdasdasdad', id: '1I3E5gT' },
  { userId: '1', articleId: '2', rate: 2, feedback: 'asdasdasd', id: 'xbwnNBF' },
  { userId: '1', articleId: '27', rate: 5, feedback: 'jhuh', id: 'tZt1Vgo' },
  { userId: '1', articleId: '1', rate: 5, feedback: 'ппн', id: '_8pg-hb' },
  { userId: '1', articleId: '6', rate: 5, id: 'lelZHUQ' },
  { userId: '1', articleId: '6', rate: 4, id: 'VA3jUq9' },
  { userId: '1', articleId: '6', rate: 5, feedback: '', id: 'vaUzgcy' },
  { userId: '1', articleId: '6', rate: 5, id: 'LMg_dpS' },
  { userId: '1', articleId: '23', rate: 5, id: 'txycxMT' }
];

const profileRatingsData = [
  { id: '1', rate: 4, feedback: 'Хорошая статья', userId: '1', profileId: '1' },
  { id: '2', rate: 4, feedback: 'Хорошая статья', userId: '1', profileId: '2' }
];

const notifications = [
  { id: '1', title: 'Новый комментарий к вашей статье', description: 'Пользователь user оставил комментарий к статье «Javascript news»', userId: '1', href: '/articles/1', unread: true },
  { id: '2', title: 'Ваша статья получила высокую оценку', description: 'Статья «TypeScript news» получила 5 звёзд от читателя', userId: '1', href: '/articles/8', unread: true },
  { id: '3', title: 'Добро пожаловать в систему!', description: 'Вы успешно зарегистрировались. Настройте профиль для персонализации', userId: '1', href: '/profile/1' },
  { id: '4', title: 'Обновление системы', description: 'Добавлены новые возможности редактирования статей и улучшен интерфейс', userId: '1' },
  { id: '5', title: 'Ваш профиль просмотрели', description: '3 пользователя посетили ваш профиль за последнюю неделю', userId: '1' },
  { id: '6', title: 'Новая статья по вашей теме', description: 'Опубликована статья «Python для анализа данных» в разделе IT', userId: '2', href: '/articles/2' },
  { id: '7', title: 'Ответ на ваш комментарий', description: 'Автор ответил на ваш комментарий к статье «Kotlin news»', userId: '2', href: '/articles/3' },
  { id: '8', title: 'Еженедельный дайджест', description: 'Самые популярные статьи недели: TypeScript, React, Node.js', userId: '2' }
];

function parseDDMMYYYY(dateStr: string): string {
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00Z`;
  }
  return new Date().toISOString();
}

async function main() {
  const userIdMap: Record<string, string> = {};

  // Step 1: Create auth users
  console.log('Creating auth users...');
  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: `${user.username}@article-space.local`,
      password: user.password,
      email_confirm: true
    });

    if (error) {
      // User might already exist
      console.warn(`  User ${user.username}: ${error.message}`);
      // Try to find existing user
      const { data: listData } = await supabase.auth.admin.listUsers();
      const existing = listData?.users?.find(
        (u) => u.email === `${user.username}@article-space.local`
      );
      if (existing) {
        userIdMap[user.id] = existing.id;
        console.log(`  Found existing user ${user.username} -> ${existing.id}`);
      }
      continue;
    }

    userIdMap[user.id] = data.user.id;
    console.log(`  Created ${user.username} -> ${data.user.id}`);
  }

  // Step 2: Update profiles with full data
  console.log('\nUpdating profiles...');
  for (const user of users) {
    const uuid = userIdMap[user.id];
    if (!uuid) continue;

    const profile = profiles[user.id] || {};

    const { error } = await supabase
      .from('profiles')
      .update({
        avatar: user.avatar,
        roles: user.roles,
        features: user.features,
        json_settings: user.jsonSettings || {},
        first_name: profile.first || null,
        last_name: profile.lastname || null,
        age: profile.age || null,
        currency: profile.currency || null,
        country: profile.country || null,
        city: profile.city || null
      })
      .eq('id', uuid);

    if (error) {
      console.error(`  Profile ${user.username}: ${error.message}`);
    } else {
      console.log(`  Updated profile for ${user.username}`);
    }
  }

  // Step 3: Insert articles
  const articleIdMap: Record<string, string> = {};
  console.log(`\nInserting ${articles.length} articles...`);

  for (const article of articles) {
    const userId = userIdMap[article.userId];
    if (!userId) {
      console.warn(`  Skipping article "${article.title}" - no user mapping for userId ${article.userId}`);
      continue;
    }

    const typeArray = Array.isArray(article.type) ? article.type : [article.type];

    const { data, error } = await supabase
      .from('articles')
      .insert({
        title: article.title,
        subtitle: article.subtitle || null,
        img: article.img || null,
        type: typeArray,
        user_id: userId,
        views: article.views || 0,
        created_at: parseDDMMYYYY(article.createdAt),
        content: article.content || null
      })
      .select('id')
      .single();

    if (error) {
      console.error(`  Article "${article.title}": ${error.message}`);
    } else {
      articleIdMap[article.id] = data.id;
      console.log(`  Inserted article "${article.title}" -> ${data.id}`);
    }
  }

  // Step 4: Insert comments
  console.log(`\nInserting ${comments.length} comments...`);

  for (const comment of comments) {
    const userId = userIdMap[comment.userId];
    const articleId = articleIdMap[comment.articleId];
    if (!userId || !articleId) {
      console.warn(`  Skipping comment - missing mapping (userId: ${comment.userId}, articleId: ${comment.articleId})`);
      continue;
    }

    const { error } = await supabase.from('comments').insert({
      text: comment.text,
      article_id: articleId,
      user_id: userId
    });

    if (error) {
      console.error(`  Comment: ${error.message}`);
    }
  }
  console.log('  Done');

  // Step 5: Insert article ratings (deduplicate by user+article)
  console.log(`\nInserting article ratings (deduplicating)...`);
  const ratingsSeen = new Set<string>();

  for (const rating of articleRatingsData) {
    const userId = userIdMap[rating.userId];
    const articleId = articleIdMap[rating.articleId];
    if (!userId || !articleId) continue;

    const key = `${userId}:${articleId}`;
    if (ratingsSeen.has(key)) continue;
    ratingsSeen.add(key);

    const { error } = await supabase.from('article_ratings').insert({
      rate: rating.rate,
      feedback: rating.feedback || null,
      user_id: userId,
      article_id: articleId
    });

    if (error) {
      console.error(`  Rating: ${error.message}`);
    }
  }
  console.log(`  Inserted ${ratingsSeen.size} unique ratings`);

  // Step 6: Insert profile ratings
  console.log(`\nInserting ${profileRatingsData.length} profile ratings...`);

  for (const rating of profileRatingsData) {
    const userId = userIdMap[rating.userId];
    const profileId = userIdMap[rating.profileId];
    if (!userId || !profileId) continue;

    const { error } = await supabase.from('profile_ratings').insert({
      rate: rating.rate,
      feedback: rating.feedback || null,
      user_id: userId,
      profile_id: profileId
    });

    if (error) {
      console.error(`  Profile rating: ${error.message}`);
    }
  }
  console.log('  Done');

  // Step 7: Insert notifications
  console.log(`\nInserting ${notifications.length} notifications...`);

  for (const notif of notifications) {
    const userId = userIdMap[notif.userId];
    if (!userId) continue;

    const { error } = await supabase.from('notifications').insert({
      title: notif.title,
      description: notif.description || null,
      user_id: userId,
      href: notif.href || null,
      unread: notif.unread ?? true
    });

    if (error) {
      console.error(`  Notification: ${error.message}`);
    }
  }
  console.log('  Done');

  console.log('\nSeed complete!');
  console.log('\nUser ID mappings (old -> new):');
  for (const [oldId, newId] of Object.entries(userIdMap)) {
    const user = users.find((u) => u.id === oldId);
    console.log(`  ${user?.username} (${oldId}) -> ${newId}`);
  }
}

main().catch(console.error);
