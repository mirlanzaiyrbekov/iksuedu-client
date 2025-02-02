import { QuestionForm } from '@/components/form/questionForm'
import { SelectData } from '@/components/selectData'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ICreateTest } from '@/interfaces/form.interface'
import { createTestScheme } from '@/services/scheme/test.scheme'
import { CopyPlus, SaveAll } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export const CreateTestPage = () => {
	const form = useForm<ICreateTest>({
		defaultValues: {
			title: '',
			questions: [
				{ content: '', answers: [{ content: '', isCorrect: false }] },
			],
		},
	})

	function onSubmit(values: z.infer<typeof createTestScheme>) {
		console.log(values)
	}

	const {
		fields: questions,
		append,
		remove,
	} = useFieldArray({
		control: form.control,
		name: 'questions',
	})

	return (
		<>
			<Helmet>
				<title>Создать тест</title>
			</Helmet>
			<div className="flex items-center justify-center py-10">
				<div className="flex flex-col gap-8 max-w-xl w-full border rounded-md p-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-3"
						>
							<span className="flex items-center gap-2 text-sky-600 font-bold text-sm">
								<CopyPlus size={16} />
								Создать тест
							</span>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="relative">
										<FormLabel className="text-xs">Название теста</FormLabel>
										<FormControl>
											<Input placeholder="Название теста" {...field} />
										</FormControl>
										<FormDescription className="hidden" />
										<FormMessage className="text-xs absolute -bottom-4 right-0" />
									</FormItem>
								)}
							/>
							<div className="flex items-center gap-1">
								<div className="flex flex-col gap-2.5">
									<span className="text-xs font-medium">Срок истечения</span>
									<SelectData />
								</div>
							</div>
							<QuestionForm
								control={form.control}
								questions={questions}
								append={append}
								remove={remove}
							/>
							<div className="pt-6">
								<Button type="submit">
									<SaveAll />
									Сохранить
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}
