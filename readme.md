# Blog Summarizer & Translator| @NEXIUMS AHMED ALI

A full stack web application that scrapes blog content, generates summaries, and translates them to multiple languages.

## Features

- ✅ URL validation and web scraping
- ✅ AI-powered text summarization
- ✅ Multi-language translation (Azure Translator + JS Dictionary)
- ✅ Dual database storage (Supabase + MongoDB)
- ✅ Modern Next.js 14 frontend
- ✅ Responsive design with Tailwind CSS


## Setup

**Install dependencies**:
   ```bash
   npm install

   npm generate prisma

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