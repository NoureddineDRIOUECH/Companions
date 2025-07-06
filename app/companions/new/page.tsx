import CompanionForm from "@/components/CompanionForm"

const NewCompanion = () => {
  return (
    <main className="min-lg:w1/3 min-md:2/3 items-center justify-center">
      <article className="w-1/3 gap-4 flex flex-col">
<h1>Companion Builder</h1>
      <CompanionForm />
      </article>
    </main>
  )
}

export default NewCompanion