import Link from '../Link'

interface Props {
  handle: string
}

export default function Twitter({ handle }: Props) {
  return (
    <Link url={`https://twitter.com/@${handle}`} external>
      @{handle}
    </Link>
  )
}
