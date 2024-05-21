"use client";

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";


const formSchema = z.object({
    ipAddress: z.string().ip({ version: "v4", message: "Invalid IP Format" })
})

const ipAddressSchema = z.object({
    as: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    countryCode: z.string().optional(),
    isp: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    org: z.string().optional(),
    query: z.string().optional(),
    region: z.string().optional(),
    regionName: z.string().optional(),
    status: z.string().optional(),
    timezone: z.string().optional(),
    zip: z.string().optional(),
})

export type ipAddressType = z.infer<typeof ipAddressSchema>

const dataWrapper = `mt-6 first-of-type:mt-0 md:mt-0 lg:border-r lg:border-darkGray lg:last-of-type:border-0 lg:mr-3`;
const ipHeader = `text-darkGray text-sm font-medium md:text-md uppercase`;
const ipPara = `text-veryDarkGray text-xl font-bold mt-1 md:text-2xl`;

const IpLookup = () => {
    const [address, setAddress] = useState<ipAddressType | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ipAddress: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setAddress(null)
        try {
            const res = await fetch(`http://ip-api.com/json/${values.ipAddress}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            console.log(data)
            setAddress(data)
        } catch (error) {
            console.error('Error fetching IP data:', error);
        }
    }

    return (
        <>
            <section className="absolute top-10 right-0 left-0">
                <h1 className="px-10 py-4 text-2xl text-center text-white font-medium">IP Address Lookup</h1>
                <Form {...form} >
                    <form className="flex justify-center max-w-xl mx-auto mt-7 md:max-w-xl"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="ipAddress"
                            render={({ field }) => (
                                <FormItem className="outline-none rounded-l-xl md:w-full">
                                    <FormControl>
                                        <Input placeholder="Search for any IP address or domain" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

                {address && <section className="absolute right-0 left-0 bg-white my-6 mx-6 p-6 rounded-xl shadow-xl grid grid-cols-1 text-center max-w-6xl md:top-44 lg:top-48 lg:py-12 md:gap-4 md:text-left md:grid-cols-2 lg:grid-cols-4 xl:mx-auto">
                    <div className={dataWrapper}>
                        <h2 className={ipHeader}>Ip address</h2>
                        <p className={ipPara}>{address.query}</p>
                    </div>
                    <div className={dataWrapper}>
                        <h2 className={ipHeader}>location</h2>
                        <p className={ipPara}>
                            {address.city}, {address.regionName}
                        </p>
                    </div>
                    <div className={dataWrapper}>
                        <h2 className={ipHeader}>timezone</h2>
                        <p className={ipPara}>{address.timezone}</p>
                    </div>
                    <div className={dataWrapper}>
                        <h2 className={ipHeader}>isp</h2>
                        <p className={ipPara}>{address.isp}</p>
                    </div>
                </section>}
            </section>
        </>

    )
}

export default IpLookup