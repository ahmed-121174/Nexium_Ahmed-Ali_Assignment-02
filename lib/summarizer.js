class TextSummarizer {
  //simple text summarization using frequency analysis
  static summarize(text, sentenceCount = 4) {
    const sentences = this.splitIntoSentences(text)
    if (sentences.length <= sentenceCount) return text

    const wordFreq = this.calculateWordFrequency(text)
    const sentenceScores = this.scoreSentences(sentences, wordFreq)
    const topSentences = this.getTopSentences(sentenceScores, sentenceCount)
    
    return topSentences.join(' ')
  }

  static splitIntoSentences(text) {
    return text.match(/[^\.!?]+[\.!?]+/g) || [text]
  }

  static calculateWordFrequency(text) {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
    
    const freq = {}
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1
    })
    
    return freq
  }

  static scoreSentences(sentences, wordFreq) {
    return sentences.map(sentence => {
      const words = sentence.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
      
      const score = words.reduce((sum, word) => {
        return sum + (wordFreq[word] || 0)
      }, 0)
      
      return { sentence, score }
    })
  }

  static getTopSentences(sentenceScores, count) {
    return sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.sentence)
  }
}

export default TextSummarizer