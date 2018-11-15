	.file	"prog.c"
	.globl	insn_count
	.bss
	.align 8
	.type	insn_count, @object
	.size	insn_count, 8
insn_count:
	.zero	8
	.text
	.globl	bubble_sort
	.type	bubble_sort, @function
bubble_sort:

#Basic Block
.LFB2:
	addq	$6, insn_count
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	movq	%rdi, -24(%rbp) #int v[]
	movl	%esi, -28(%rbp) #int n
	movl	$0, -4(%rbp)
	jmp	.L2

#Basic Block
.L8:
	addq	$3, insn_count
	movl	$0, -12(%rbp)
	movl	$1, -8(%rbp)
	jmp	.L3

#Basic Block
.L5:
	addq	$15, insn_count
	movl	-8(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rdx
	movq	-24(%rbp), %rax
	addq	%rdx, %rax
	movl	(%rax), %edx
	movl	-8(%rbp), %eax
	cltq
	leaq	0(,%rax,4), %rcx
	movq	-24(%rbp), %rax
	addq	%rcx, %rax
	movl	(%rax), %eax
	cmpl	%eax, %edx #If v[j-1] < v[j] then don't into loop
	jle	.L4

#Basic Block
	addq	$29, insn_count
	movl	-8(%rbp), %eax
	cltq
	leaq	0(,%rax,4), %rdx
	movq	-24(%rbp), %rax
	addq	%rdx, %rax
	movl	(%rax), %eax
	movl	%eax, -16(%rbp)
	movl	-8(%rbp), %eax
	cltq	#Converts int to 64 bit
	leaq	0(,%rax,4), %rdx
	movq	-24(%rbp), %rax
	addq	%rax, %rdx
	movl	-8(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rcx
	movq	-24(%rbp), %rax
	addq	%rcx, %rax
	movl	(%rax), %eax
	movl	%eax, (%rdx)
	movl	-8(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rdx
	movq	-24(%rbp), %rax
	addq	%rax, %rdx
	movl	-16(%rbp), %eax
	movl	%eax, (%rdx)
	movl	$1, -12(%rbp)  #Set 'swapped = 1'

#Basic Block
.L4:
	addq	$1, insn_count
	addl	$1, -8(%rbp) #Add 1 to 'j' until it's not less than 'n'

#Basic Block
.L3:
	addq	$3, insn_count
	movl	-8(%rbp), %eax
	cmpl	-28(%rbp), %eax #compares of 'j' is less than 'n'
	jl	.L5 #If 'j' is less than 'n' than restart loop

#Basic Block
	addq	$2, insn_count
	cmpl	$0, -12(%rbp)
	jne	.L6 #If 'swapped' is not equal then add 1 to i

#Basic Block
	addq	$1, insn_count
	jmp	.L1 #Else break

#Basic Block
.L6:
	addq	$1, insn_count
	addl	$1, -4(%rbp) #Add 1 to 'i'

#Basic Block
.L2:
	addq	$3, insn_count
	movl	-4(%rbp), %eax
	cmpl	-28(%rbp), %eax #If 'i' is less than 'n'
	jl	.L8 #Jump inside loop if 'i' is less than 'n'

#Basic Block
.L1:
	addq	$2, insn_count
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc

#Basic Block
.LFE2:
	.size	bubble_sort, .-bubble_sort
	.globl	check_sorted
	.type	check_sorted, @function

check_sorted:

#Basic Block
.LFB3:
	addq	$6, insn_count
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	movq	%rdi, -24(%rbp)
	movl	%esi, -28(%rbp)
	movl	$1, -4(%rbp) #Set 'i' equal to 1
	jmp	.L10

#Basic Block
.L13:
	addq	$15, insn_count
	movl	-4(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rdx
	#If v[i-1] < v[i] 
	movq	-24(%rbp), %rax
	addq	%rdx, %rax
	movl	(%rax), %edx
	movl	-4(%rbp), %eax
	cltq
	leaq	0(,%rax,4), %rcx
	movq	-24(%rbp), %rax
	addq	%rcx, %rax
	movl	(%rax), %eax
	cmpl	%eax, %edx #If v[i-1] < v[i] then continue loop
	jle	.L11

#Basic Block
	addq	$2, insn_count
	movl	$0, %eax  #else array is not sorted and exit program
	jmp	.L12

#Basic Block
.L11:
	addq	$1, insn_count
	addl	$1, -4(%rbp) #Add 1 to 'i'

#Basic Block
.L10:
	addq	$3, insn_count
	movl	-4(%rbp), %eax
	cmpl	-28(%rbp), %eax #Compare i and n
	jl	.L13 #If 'i' < 'n' than re-enter loop

#Basic Block
	addq	$1, insn_count
	movl	$1, %eax #otherwise return 1 and exit function

#Basic Block
.L12:
	addq	$2, insn_count
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc

#Basic Block
.LFE3:
	.size	check_sorted, .-check_sorted
	.comm	numbers,40000,32
	.section	.rodata

#Basic Block
.LC0:
	.string	"numbers are sorted"

#Basic Block
.LC1:
	.string	"numbers are not sorted"
	.align 8

#Basic Block
.LC2:
	.string	"%lld instructions are executed\n"
	.text
	.globl	main
	.type	main, @function
main:

#Basic Block
.LFB4:
	addq	$5, insn_count
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movl	$0, -4(%rbp)
	jmp	.L15

#Basic Block
.L16:
	addq	$5, insn_count
	call	rand
	movl	-4(%rbp), %edx
	movslq	%edx, %rdx
	movl	%eax, numbers(,%rdx,4)
	addl	$1, -4(%rbp)

#Basic Block
.L15:
	addq	$2, insn_count
	cmpl	$9999, -4(%rbp)
	jle	.L16

#Basic Block
	addq	$8, insn_count
	movl	$10000, %esi
	movl	$numbers, %edi
	call	bubble_sort
	movl	$10000, %esi
	movl	$numbers, %edi
	call	check_sorted
	testl	%eax, %eax
	je	.L17

#Basic Block
	addq	$3, insn_count
	movl	$.LC0, %edi
	call	puts
	jmp	.L18

#Basic Block
.L17:
	addq	$2, insn_count
	movl	$.LC1, %edi
	call	puts

#Basic BLock
.L18:
	addq	$7, insn_count
	movq	insn_count(%rip), %rax
	movq	%rax, %rsi
	movl	$.LC2, %edi
	movl	$0, %eax
	call	printf
	movl	$0, %edi
	call	exit
	.cfi_endproc

#Basic Block
.LFE4:
	.size	main, .-main
	.ident	"GCC: (GNU) 4.8.5 20150623 (Red Hat 4.8.5-11)"
	.section	.note.GNU-stack,"",@progbits
