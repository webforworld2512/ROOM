import MeetingClient from './MeetingClient'

export function generateStaticParams() {
  // Return empty array - dynamic routes will be handled client-side via catch-all
  // For static export, we need at least one param, so return a placeholder
  return [{ id: 'placeholder' }]
}

const Meeting = ({ params }: { params: { id: string } }) => {
  return <MeetingClient id={params.id} />
}

export default Meeting
