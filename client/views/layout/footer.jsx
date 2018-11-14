import '../../assets/scss/footer.scss'
export default{
  data () {
    return {
      author: 'Power'
    }
  },
  render () {
    return (
      <div class="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
