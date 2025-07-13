import axios from 'axios'

export class AzureTranslator {
  static async translate(text, targetLanguage, sourceLanguage = 'auto') {
    try {
      const response = await axios.post(
        `${process.env.AZURE_TRANSLATOR_ENDPOINT}/translate`,
        [{
          text: text
        }],
        {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
            'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
            'Content-Type': 'application/json'
          },
          params: {
            'api-version': '3.0',
            'to': targetLanguage,
            ...(sourceLanguage !== 'auto' && { 'from': sourceLanguage })
          }
        }
      )
      
      return response.data[0].translations[0].text
    } catch (error) {
      throw new Error(`Translation failed: ${error.message}`)
    }
  }
}