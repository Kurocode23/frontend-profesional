export default {
  getImage () {
    return {
      id: 'c43313a5-8a09-4678-8109-de3b7e87f246',
      publicId: '5YdPY8WZ0ytxghBMWnBPoy',
      userId: 'platzigram',
      liked: false,
      likes: 0,
      src: 'http://platzigram.test/5YdPY8WZ0ytxghBMWnBPoy.jpg',
      description: '#awesome',
      tags: [ 'awesome' ],
      createdAt: new Date().toString()
    }
  },

  getImages (n) {
    return [
      this.getImage(),
      this.getImage(),
      this.getImage()
    ]
  }
}
