import { Queue, QueueEvents } from 'bullmq'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import {
  aiConversationRequestSchema,
  convertHtmltoDocxRequestSchema,
  createRequestSchema,
} from '@/entities/Content/schema'
import {
  type aiConversationOutput,
  type aiConversationRequestInput,
  type convertHtmltoDocxOutput,
  type convertHtmltoDocxRequestInput,
} from '@/entities/Content/types'
import {
  REDIS_COMPLETION_JOB_NAME,
  REDIS_COMPLETION_QUEUE_NAME,
  REDIS_CONVERTER_DOCX_JOB_NAME,
  REDIS_CONVERTER_QUEUE_NAME,
} from '@/server/constants'

// const parserQueue = new Queue<convertHtmltoDocxRequestInput, convertHtmltoDocxOutput>(REDIS_PARSER_QUEUE_NAME)
// const parserQueueEvents = new QueueEvents(REDIS_PARSER_JOB_NAME)

const converterQueue = new Queue<convertHtmltoDocxRequestInput, convertHtmltoDocxOutput>(REDIS_CONVERTER_QUEUE_NAME)
const converterQueueEvents = new QueueEvents(REDIS_CONVERTER_QUEUE_NAME)

const completionQueue = new Queue<aiConversationRequestInput, aiConversationOutput>(REDIS_COMPLETION_QUEUE_NAME)
const completionQueueEvents = new QueueEvents(REDIS_COMPLETION_QUEUE_NAME)

export const contentRouter = createTRPCRouter({
  fetchContent: publicProcedure.input(createRequestSchema).mutation(({ input }) => {
    return {
      title: 'Durable - AI Tool Review, Pricing 2023 - Chat GPT Login',
      description:
        'Durable AI is an AI-driven website builder that aims to empower entrepreneurs in effortlessly crafting high-quality websites.',
      content:
        '<div><article><div><h2>Durable Features</h2><p><strong>Durable AI</strong> is an AI-driven website builder that aims to empower entrepreneurs in effortlessly crafting high-quality websites.<h3>Key features and advantages include:</h3><ol><li><strong>All-in-one platform</strong>: CRM tools, invoicing, promotional content creation, and more<li><strong>Robustness:</strong> The AI system can handle unexpected inputs, noisy data, and variations in the input without significant degradation in performance. It can handle real-world scenarios effectively, even in challenging and dynamic environments.<li><strong>Scalability:</strong> The AI system can efficiently scale its performance to handle increased data, users, or computational demands without sacrificing accuracy or response time.<li><strong>Interoperability:</strong> Durable AI features can seamlessly integrate and work with other existing systems and technologies, allowing for easy collaboration and data exchange.<li><strong>Adaptability:</strong> The AI system can adapt to changing conditions, user needs, and technological advancements through continuous learning and updates.<li><strong>Ethical and Privacy Considerations:</strong> Durable AI features should include mechanisms to address ethical concerns and ensure privacy and data security, making the AI system compliant with regulations and user expectations.<li><strong>Transparency and Explainability:</strong> The AI system should be able to explain its decision-making process and provide insights into how it arrived at a particular conclusion, ensuring transparency and building trust with users.<li><strong>Generalization:</strong> Durable AI features allow the system to generalize knowledge from one domain to another, enabling it to apply learned concepts to new situations and tasks.<li><strong>Continuous Learning:</strong> The AI system should have the ability to learn from new data and experiences, continually improving its performance and adapting to evolving conditions</ol><h3><strong>Use cases</strong> for Durable AI involve various website-related activities:</h3><p>Durable AI can be applied in diverse scenarios related to website-related activities, including but not limited to:<ol><li><strong>Website Creation:</strong> Entrepreneurs and businesses can use Durable AI to easily and efficiently build professional websites without the need for extensive technical expertise.<li><strong>Content Generation:</strong> Durable AI can assist in generating website content, such as blog posts, product descriptions, and landing page copy, saving time and effort for content creators.<li><strong>Design Optimization:</strong> The AI-powered platform can analyze user preferences and behavior to optimize website design, ensuring better user experiences and higher conversion rates.<li><strong>SEO Enhancement:</strong> Durable AI can suggest relevant keywords, meta tags, and content improvements to improve a website’s search engine ranking and visibility.<li><strong>Personalization:</strong> Websites can be tailored to individual users using Durable AI, providing personalized recommendations and content based on their interests and browsing history.</ol><p>Durable AI comes highly recommended by reputable sources, offering a trusted solution with plans starting at just $15 per month and a 30-day free trial option.</div></article></div>',
      slug: 'dolgovechnost--obzor-instrumentov-iskusstvennogo-intellekta-tseni-na-2023-g--vkhod-v-chat-gpt',
      url: 'https://chatgptlogin.ai/blog/durable',
      tags: ['веб', 'искусственного', 'интеллекта'],
      translatedTitle: 'Долговечность — обзор инструментов искусственного интеллекта, цены на 2023 г. — вход в чат GPT',
      translatedDescription:
        'Durable AI — это конструктор веб-сайтов на основе искусственного интеллекта, целью которого является предоставление предпринимателям возможности легко создавать высококачественные веб-сайты.',
      translatedContent:
        '<div><article><div><h2 id="test">Надежные функции</h2><p><strong>Durable AI</strong> - это конструктор веб-сайтов, основанный на искусственном интеллекте, целью которого является расширение возможностей предпринимателей в создании высококачественных веб-сайтов без особых усилий.<h3>Ключевые функции и преимущества включают:</h3><ol><li><strong>Платформа "все в одном"</strong>: инструменты CRM, выставление счетов, создание рекламного контента и многое другое<li><strong>Надежность:</strong> Система искусственного интеллекта может обрабатывать неожиданные входные данные, зашумленные данные и вариации входных данных без существенного снижения производительности. Она может эффективно работать со сценариями реального мира даже в сложных и динамичных средах.<li><strong>Масштабируемость:</strong> Система искусственного интеллекта может эффективно масштабировать свою производительность, чтобы справляться с возросшими требованиями к данным, пользователям или вычислениям, не жертвуя точностью или временем отклика.<li><strong>Совместимость: </strong> Надежные функции искусственного интеллекта могут легко интегрироваться и работать с другими существующими системами и технологиями, обеспечивая простоту совместной работы и обмена данными.<li><strong>Адаптивность:</strong> Система искусственного интеллекта может адаптироваться к изменяющимся условиям, потребностям пользователей и технологическим достижениям благодаря постоянному обучению и обновлениям.<li><strong>Этические соображения и соображения конфиденциальности: </strong> Надежные функции ИИ должны включать механизмы для решения этических проблем и обеспечения конфиденциальности и безопасности данных, что делает систему ИИ соответствующей нормативным актам и ожиданиям пользователей.<li><strong>Прозрачность и объяснимость:</strong> Система искусственного интеллекта должна быть в состоянии объяснить свой процесс принятия решений и дать представление о том, как она пришла к определенному выводу, обеспечивая прозрачность и укрепляя доверие пользователей.<li><strong>Обобщение: </strong> Надежные функции искусственного интеллекта позволяют системе обобщать знания из одной предметной области в другую, позволяя применять изученные концепции к новым ситуациям и задачам.<li><strong>Непрерывное обучение:</strong> Система искусственного интеллекта должна обладать способностью извлекать уроки из новых данных и опыта, постоянно улучшая свою производительность и адаптируясь к меняющимся условиям</ol><h3><strong>Варианты использования</strong> для надежного ИИ включают различные действия, связанные с веб-сайтом:</h3><p>Надежный ИИ может может применяться в различных сценариях, связанных с деятельностью, связанной с веб-сайтами, включая, но не ограничиваясь:<ol><li><strong>Создание веб-сайтов:</strong> Предприниматели и предприятия могут использовать надежный искусственный интеллект для простого и эффективного создания профессиональных веб-сайтов без необходимости в обширных технических знаниях.<li><strong>Генерация контента: </strong> Надежный искусственный интеллект может помочь в создании контента веб-сайта, такого как записи в блоге, описания продуктов и копия целевой страницы, экономя время и усилия создателей контента.<li><strong>Оптимизация дизайна:</strong> Платформа на базе искусственного интеллекта может анализировать предпочтения и поведение пользователей для оптимизации дизайна веб-сайта, обеспечивая лучший пользовательский опыт и более высокие показатели конверсии.<li><strong>Улучшение SEO: </strong> Надежный искусственный интеллект может предлагать релевантные ключевые слова, мета-теги и улучшения контента для улучшения рейтинга веб-сайта в поисковых системах и его видимости.<li><strong>Персонализация: </strong> Веб-сайты могут быть адаптированы к индивидуальным пользователям с помощью надежного искусственного интеллекта, предоставляя персонализированные рекомендации и контент на основе их интересов и истории посещений.</ol><p>Надежный искусственный интеллект настоятельно рекомендуется авторитетными источниками, предлагая надежное решение с планами, начинающимися с всего 15 долларов в месяц и 30-дневная бесплатная пробная версия.</div></article></div>',
    }
  }),
  getConversation: publicProcedure.input(aiConversationRequestSchema).mutation(async ({ input }) => {
    const completionJob = await completionQueue.add(REDIS_COMPLETION_JOB_NAME, {
      type: input.type,
      language: input.language,
      content: input.content
    })

    return await completionJob.waitUntilFinished(completionQueueEvents)

    // return {
    //   content: `${input.type} ${input.content}`,
    // }
  }),
  convertHtmlToDocx: publicProcedure.input(convertHtmltoDocxRequestSchema).mutation(async ({ input }) => {
    const converterJob = await converterQueue.add(REDIS_CONVERTER_DOCX_JOB_NAME, {
      content: input.content,
    })
    return await converterJob.waitUntilFinished(converterQueueEvents)
  }),
})
