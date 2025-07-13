# Blog Summarizer & Translator| @NEXIUMS AHMED ALI

A full stack web application that scrapes blog content, generates summaries, and translates them to multiple languages.

## Features

- URL validation and web scraping
- AI powered text summarization
- Multi language translation (Azure Translator + JS Dictionary)
- Dual database storage (Supabase + MongoDB)
- Modern Next.js 14 frontend
- Responsive design with Tailwind CSS


## Setup

**Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   npm install next@^15.3.5 react@^19.1.0 react-dom@^19.1.0 --legacy-peer-deps
   npm install prisma@^6.11.1 @prisma/client@^6.11.1 --legacy-peer-deps
   npm install @supabase/supabase-js@^2.50.5 --legacy-peer-deps
   npm install mongodb@^6.17.0 --legacy-peer-deps
   npm install axios@^1.10.0 --legacy-peer-deps
   npm install cheerio@^1.1.0 --legacy-peer-deps
   npm install react-hook-form@^7.60.0 --legacy-peer-deps
   npm install @hookform/resolvers@^3.10.0 --legacy-peer-deps
   npm install zod@^3.25.76 --legacy-peer-deps
   npm install tailwindcss@^3.4.17 --legacy-peer-deps
   npm install postcss@^8.5.6 --legacy-peer-deps
   npm install autoprefixer@^10.4.21 --legacy-peer-deps
   npm install tailwind-merge@^2.6.0 --legacy-peer-deps
   npm install class-variance-authority@^0.7.1 --legacy-peer-deps
   npm install clsx@^2.1.1 --legacy-peer-deps
   npm install lucide-react@^0.294.0 --legacy-peer-deps
   npm install dotenv@^17.2.0 --legacy-peer-deps
   npm install eslint@^8.57.1 eslint-config-next@^14.0.0 --save-dev --legacy-peer-deps
   npm install @types/node --save-dev --legacy-peer-deps
   npm install @radix-ui/react-select @radix-ui/react-dialog --legacy-peer-deps
   npm install winston --legacy-peer-deps
   npm install validator --legacy-peer-deps

   npx prisma generate
   npm run build

   npm run dev
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   AZURE_TRANSLATOR_KEY=your_azure_translator_key
   AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
   AZURE_TRANSLATOR_REGION=your_region
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   MONGODB_URI=your_mongodb_uri
   ```

3. **Set up Supabase**:
   - Create a new project in Supabase
   - Run the SQL schema provided in `supabase_schema.sql`

4. **Set up MongoDB**:
   - Create a MongoDB Atlas account
   - Get your connection string

5. **Set up Azure Translator**:
   - Create an Azure Cognitive Services account
   - Get your translator key and endpoint

6. **Run the development server**:
   ```bash
   npm run dev
   ```

## Supported Languages

- English (en)
- Urdu (ur)
- Arabic (ar)
- Hindi (hi)
- Spanish (es)

## API Endpoints

- `POST /api/process-blog` - Process blog URL and return summary with translation

## Deployment

Deploy to Vercel:
```bash
npm run build
```
