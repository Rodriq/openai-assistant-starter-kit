import OpenAIAssistant from "@/app/ui/openai-assistant";


export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="mx-auto mb-12 max-w-lg text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-blue-600 md:text-6xl lg:text-6xl">
          Cameroon Lawyer
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-600">
          Your trusted AI assistant for legal insights on Cameroon laws and the penal code.
        </p>
        {/* <div className="mb-8">
          <img 
            src="/images/legal-icon.png" 
            alt="Legal Icon" 
            className="w-16 h-16 mx-auto mb-4"
          />
        </div> */}
        <OpenAIAssistant 
          assistantId="asst_iOR0pHxucvqC1vbiHjHerY3O"
          greeting="I am here to assist you with legal matters in Cameroon. How can I help you today?"
        />
      </div>
      <footer className="mt-auto mb-4 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Cameroon Lawyer. All rights reserved.<br></br>
        by <a href="https://nocodesolutions.tech/"><b className="ml-2 text-blue-500 hover:bg-blue-700">Nocode Solutions</b></a>
        
         
      </footer>
    </main>
  );
}
